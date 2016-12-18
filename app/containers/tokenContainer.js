import { connect } from 'react-redux';
import { actionCreators } from '../actions/tokenActions';

const mapStateToProps = (state) => {
  return { token: state.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (token) => {
       dispatch(actionCreators.getToken(token));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
