import React from 'react'
import { connect } from 'react-redux'


export const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    render() {
      const { user } = this.props;

      if (!user) {
        return null;
      }

      return (
        <Component />
      )
    }
  }

  const mapStateToProps = (state) => ({
    user: state.common.user,
  });

  return connect(mapStateToProps)(WithAuthentication)
};
