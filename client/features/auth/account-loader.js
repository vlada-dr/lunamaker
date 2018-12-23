import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'

import { LOAD_USER } from '../../types';
import { auth } from '../../api';


const mapDispatchToProps = (dispatch) => ({
  onFetch: () => dispatch({ type: LOAD_USER, payload: auth.current() }),
});

const mapStateToProps = (state) => ({
  user: state.common.user,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(
    (props, nextProps) => props.user.accountId !== nextProps.user.accountId,
    ({ user, onFetch }) => {
      if (window.localStorage.getItem('jwt') && !user.accountId) {
        onFetch()
      }
    },
  ),
);

export const AccountLoader = enhance(({ children }) => children);
