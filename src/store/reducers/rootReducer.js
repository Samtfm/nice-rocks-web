import { combineReducers } from 'redux';
import rocksReducer from './rocksReducer';

export default combineReducers({
  rocks: rocksReducer,
});
