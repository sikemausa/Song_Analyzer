import {types} from './actionTypes';

export const actionCreators = {
  getSongs: () => {
    return {type: types.GET_SONGS, data: "yo"};
  }
};
