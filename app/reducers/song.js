import * as types from '../actions/actionTypes';

const initialState = [];

const songs = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_SONGS':
      return data;
  }
  return state;
};

export default songs;
