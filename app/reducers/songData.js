import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map([]);

const songData = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_SONG_DATA':
      return data;
  }
  return state;
};

export default songData;
