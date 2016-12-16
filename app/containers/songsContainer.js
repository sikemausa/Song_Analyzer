import { connect } from 'react-redux';
import { actionCreators } from '../actions/songAction';

const mapStateToProps = (state) => {
  return { songs: state.songs };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSongs: (songs) => {
       dispatch(actionCreators.getSongs(songs));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
