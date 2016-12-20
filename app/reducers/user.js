import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map({});

const user = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_USER':
      return Map(data);
  }

  return state;
};

export default user;
