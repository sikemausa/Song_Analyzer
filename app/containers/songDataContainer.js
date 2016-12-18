import { connect } from 'react-redux';
import { actionCreators } from '../actions/songDataAction';

const mapStateToProps = (state) => {
  return { songData: state.songData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSongData: (songData) => {
       dispatch(actionCreators.getSongData(songData));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
