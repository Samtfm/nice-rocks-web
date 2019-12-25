import { database } from '../../firebase/util';

export const FETCH_USERS = 'FETCH_USERS';


export const fetchUsers = (userIds) => (dispatch, getState) => {
  const stateUsers = getState().users;

  const userRequests = userIds.filter(id => {
    return !stateUsers[id]
  }).map(id => {
    return database.collection("users").doc(id).get();
  });

  Promise.all(userRequests).then(docs => {
    const users = {}
    docs.forEach(doc => {
      const user = doc.data();
      user.id = doc.id;
      users[user.id] = user;
    });
    dispatch({
      type: FETCH_USERS,
      users: users,
    })
  });
};
