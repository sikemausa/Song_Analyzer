import { combineReducers } from 'redux';
import songs from './song';
import user from './user';

const reducers = combineReducers({
  songs,
  user
});

export default reducers;
