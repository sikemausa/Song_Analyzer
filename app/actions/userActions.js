import {types} from './actionTypes';

export const actionCreators = {
  getUser: (data) => {
    return {type: types.GET_USER, data: data};
  }
};
