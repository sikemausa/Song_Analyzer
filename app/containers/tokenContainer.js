import { connect } from 'react-redux';
import { actionCreators } from '../actions/userActions';

const mapStateToProps = (state) => {
  return { user: state.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token) => {
       dispatch(actionCreators.getUser(token));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
