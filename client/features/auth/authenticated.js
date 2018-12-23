import React from 'react'
import { connect } from 'react-redux'


class WithAuthentication extends React.Component {
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  user: state.common.user,
});

export const Authenticated = connect(mapStateToProps)(WithAuthentication);
