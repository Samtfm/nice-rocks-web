import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const defaultState = {
  rocks: {},
  // users: {},
}

const configureStore = (initialState=defaultState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

export default configureStore;
