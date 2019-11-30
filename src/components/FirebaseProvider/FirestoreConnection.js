class FirestoreConnection{
  constructor(firebase, localStore){
    this.db = firebase.firestore();
    this.firebase = firebase;
    this.localStore = localStore;
  }

  //
  //  example: getRocks("toUser", "==", user.uid)
  getRocks = (field, comparitor, value) => {
    const rocksRef = this.db.collection("rocks");
    const usersRef = this.db.collection("users");
    return new Promise((resolve, reject) => {
      try {
        rocksRef.where(field, comparitor, value).get().then((querySnapshot) => {
          const rocks = querySnapshot.docs.map((doc) => {
            const rock = doc.data()
            rock.id = doc.id;
            return rock;
          });

          const userSet = new Set();
          rocks.forEach(rock => {
            userSet.add(rock.fromUser)
            userSet.add(rock.toUser)
          })
          this.ensureUsers(userSet).then(() => {
            rocks.forEach(rock => {
              rock['fromUser'] = this.localStore.users[rock.fromUser]
              rock['toUser'] = this.localStore.users[rock.toUser]
            })
            resolve(rocks);
          })
        });
      } catch (e) {
        reject(e)
      }
    });
  }

  ensureUsers = (userSet) => {
    return new Promise((resolve, reject) => {
      try {
        const missingUserRequests = [...userSet].filter(id => {
          return !this.localStore.users[id]
        }).map(id => {
          return this.db.collection("users").doc(id).get();
        });
        Promise.all(missingUserRequests).then(docs => {
          docs.map(doc => {
            this.localStore.users[doc.id] = doc.data();;
          })
          resolve();
        });
      } catch (e) {
        reject(e)
      }
    })
  }

  getUser = (email) => {
    return new Promise((resolve, reject) => {
      this.db.collection("users").where('email', '==', email).get().then((querySnapshot) => {
        const doc = querySnapshot.docs.length ? querySnapshot.docs[0] : null
        if (doc) {
          const user = doc.data();;
          this.localStore.users[doc.id] = user;
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  postRock = (data) => {
    return this.db.collection("rocks").add(
      {
        note: data.note,
        url: data.url,
        toUser: data.toUser,
        fromUser: this.firebase.auth().currentUser.uid,
        timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
      }
    )
  }
}

export default FirestoreConnection;
