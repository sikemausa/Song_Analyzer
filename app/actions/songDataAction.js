import {types} from './actionTypes';

export const actionCreators = {
  getSongs: (data) => {
    return {type: types.GET_SONG_DATA, data: data};
  }
};
