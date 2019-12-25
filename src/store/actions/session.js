import { initFirebase } from '../../firebase/util';
import { database, getCurrentUser } from '../../firebase/util';

export const GET_SESSION = 'GET_SESSION';

export const getCurrentSession = () => dispatch => {
  initFirebase((firebase) => {
    const usersRef = database.collection("users");
    usersRef.doc(firebase.auth().currentUser.uid).get().then(doc => {
      dispatch({
        type: GET_SESSION,
        currentUser: doc.data(),
      });
    })
  });
}
