const usersReducer = (stateSlice = {}, action) => {
  switch (action.type) {
    case 'FETCH':
    return Object.assign(stateSlice, { ...action.users });
    default:
      return stateSlice
  }
}

export default usersReducer;
