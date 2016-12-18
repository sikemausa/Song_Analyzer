import { combineReducers } from 'redux';
import songs from './song';
import user from './user';
import songData from './songData';

const reducers = combineReducers({
  songs,
  user,
  songData,
});

export default reducers;
