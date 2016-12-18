import { combineReducers } from 'redux';
import songs from './song';
import user from './user';
import songData from './songData';
import token from './token';

const reducers = combineReducers({
  songs,
  user,
  songData,
  token,
});

export default reducers;
