import { connect } from 'react-redux';
import { actionCreators } from '../actions/userActions';

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => {
       dispatch(actionCreators.getUser(user));
     }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
