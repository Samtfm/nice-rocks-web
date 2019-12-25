import { FETCH_ROCKS } from '../actions/rocks';


const rocksReducer = (stateSlice = {}, action) => {
  switch (action.type) {
    case FETCH_ROCKS:
    return Object.assign(stateSlice, { ...action.rocks });
    default:
      return stateSlice
  }
}

export default rocksReducer;
