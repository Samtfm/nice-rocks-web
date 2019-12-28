// import { firebaseGetRocks } from './firebase/FirestoreConnection'
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { database, getCurrentUser } from '../../firebase/util';
import store from '../store';
import { fetchUsers } from './users';

export const FETCH_ROCKS = 'FETCH_ROCKS'

const FIVE_MINUTES = 1000*60*5


export const fetchRocks = (field, comparitor, value) => (dispatch, getState) => {
  const rocksRef = database.collection("rocks");
  const usersRef = database.collection("users");
  try {
    return rocksRef.where(field, comparitor, value).get().then((querySnapshot) => {

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

let lastFetchedRecievedRocks = 0
let lastFetchedSentRocks = 0
export const fetchRecievedRocks = (force=false) => (dispatch) => {
  if (force) {
    lastFetchedRecievedRocks = 0
    lastFetchedSentRocks = 0
  }
  if (Date.now() - lastFetchedRecievedRocks > FIVE_MINUTES) {
    lastFetchedRecievedRocks = Date.now()
    return dispatch(fetchRocks("toUser", "==", getCurrentUser().uid));
  }
}

export const fetchSentRocks = (force=false) => (dispatch) => {
  if (force) {
    lastFetchedRecievedRocks = 0
    lastFetchedSentRocks = 0
  }

  if (Date.now() - lastFetchedSentRocks > FIVE_MINUTES) {
    lastFetchedSentRocks = Date.now()
    return dispatch(fetchRocks("fromUser", "==", getCurrentUser().uid));
  }
}
