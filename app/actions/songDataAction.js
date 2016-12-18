import {types} from './actionTypes';

export const actionCreators = {
  getSongData: (data) => {
    return {type: types.GET_SONG_DATA, data: data};
  }
};
