const rocksReducer = (stateSlice = {}, action) => {
  switch (action.type) {
    case 'FETCH':
    return Object.assign(stateSlice, { ...action.rocks });
    default:
      return stateSlice
  }
}

export default rocksReducer;
