import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';
// import { friendRocks } from '../demoData';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      friendRocks: { users: {}, rocks: []},
      firestoreReady: false,
    };
  }

  componentDidUpdate(){
    if (!this.state.firestoreReady) {
      this.setState({
        firestoreReady: true,
      }, this.onFirestoreReady);
    }
  }

  onFirestoreReady(){
    const { db, user, localStore } = this.props.firebase;
    if (!user) {
      return;
    }
    const rocksRef = db.collection("rocks");
    const usersRef = db.collection("users");
    rocksRef.where("toUser", "==", user.uid).get().then((querySnapshot) => {
      const rocks = [];
      querySnapshot.forEach((doc) => {
          rocks.push(doc.data());
      });
      const missingUsers = {};
      rocks.forEach(rock => {
        if (!localStore[rock.fromUser]) {
          missingUsers[rock.fromUser] = true;
        }
        if (!localStore[rock.toUser]) {
          missingUsers[rock.fromUser] = true;
        }
      });
      const missingUserRequests = Object.keys(missingUsers).map(id => {
        return db.collection('users').doc(id).get();
      });
      Promise.all(missingUserRequests).then(docs => {
        let items = docs.map(doc => doc.data());
        docs.map(doc => {
          const user = doc.data();
          localStore.users[doc.id] = user;
        })
        rocks.forEach(rock => {
          rock['fromUser'] = localStore.users[rock.fromUser]
        })
        this.setState({
          friendRocks: { rocks: rocks}
        });
      });
    });
  }

  render() {
    const { user, firebaseLoaded, signOut, signInWithRedirect} = this.props.firebase;
    const { friendRocks } = this.state;
    return (
      <div>
        { firebaseLoaded ? (
          <div>
            { user ? (
              <div>
                {`Hi ${user.displayName} `}
                <button onClick={signOut}>{"Log out"}</button>
              </div>
            ) : (
              <button onClick={signInWithRedirect}>{"login with google"}</button>
            )}
            <Browse friendRocks={friendRocks} />
            <SendRockLink />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default withFirebase(Home);
