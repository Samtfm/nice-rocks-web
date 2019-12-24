// import { firebaseGetRocks } from './firebase/FirestoreConnection'
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { database, getCurrentUser } from '../../firebase/util';


export const fetchRocks = (field, comparitor, value) => dispatch => {
  const rocksRef = database.collection("rocks");
  const usersRef = database.collection("users");
  try {
    rocksRef.where(field, comparitor, value).get().then((querySnapshot) => {

      const userSet = new Set();
      const rocks = {}
      querySnapshot.docs.map((doc) => {
        const rock = doc.data()
        rock.id = doc.id;
        console.log(rock.id)
        userSet.add(rock.fromUser)
        userSet.add(rock.toUser)
        rocks[rock.id] = rock;
        return rock;
      });
      dispatch({
        type: 'FETCH',
        rocks: rocks,
      })
    });
  } catch (e) {
    console.log(e)
  }
}

export const fetchRecievedRocks = () => (dispatch) => {
  dispatch(fetchRocks("toUser", "==", getCurrentUser().uid));
}
