import * as types from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map({});

const token = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'GET_TOKEN':
      return Map(data);
  }

  return state;
};

export default token;
