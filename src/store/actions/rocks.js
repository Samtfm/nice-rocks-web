// import { firebaseGetRocks } from './firebase/FirestoreConnection'
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { database, getCurrentUser } from '../../firebase/util';
import store from '../store';
import { fetchUsers } from './users';

export const FETCH_ROCKS = 'FETCH_ROCKS'

export const fetchRocks = (field, comparitor, value) => (dispatch, getState) => {
  const rocksRef = database.collection("rocks");
  const usersRef = database.collection("users");
  try {
    rocksRef.where(field, comparitor, value).get().then((querySnapshot) => {

      const userSet = new Set();
      const rocks = {}
      querySnapshot.docs.forEach((doc) => {
        const rock = doc.data()
        rock.id = doc.id;
        rocks[rock.id] = rock;

        [rock.fromUser, rock.toUser].forEach(id => userSet.add(id))
      });

      dispatch(fetchUsers(Array.from(userSet)))
      dispatch({
        type: FETCH_ROCKS,
        rocks: rocks,
      });
    });
  } catch (e) {
    console.log(e)
  }
}

export const fetchRecievedRocks = () => (dispatch) => {
  dispatch(fetchRocks("toUser", "==", getCurrentUser().uid));
}
