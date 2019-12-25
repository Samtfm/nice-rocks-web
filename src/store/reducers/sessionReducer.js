import { GET_SESSION } from '../actions/session';


const sessionReducer = (stateSlice = {}, action) => {
  switch (action.type) {
    case GET_SESSION:
    return Object.assign(stateSlice, { currentUser: action.currentUser });
    default:
      return stateSlice
  }
}

export default sessionReducer;
