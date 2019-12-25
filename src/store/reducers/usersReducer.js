import { FETCH_USERS } from '../actions/users';


const usersReducer = (stateSlice = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
    return Object.assign(stateSlice, { ...action.users });
    default:
      return stateSlice
  }
}

export default usersReducer;
