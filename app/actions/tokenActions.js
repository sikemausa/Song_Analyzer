import {types} from './actionTypes';

export const actionCreators = {
  getToken: (data) => {
    return {type: types.GET_TOKEN, data: data};
  }
};
