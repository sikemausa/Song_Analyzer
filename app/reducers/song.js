import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map({});

const songs = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_SONGS':
      return Map(data);
  }
  return state;
};

export default songs;
