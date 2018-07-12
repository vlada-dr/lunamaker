import React from 'react'
import { connect } from 'react-redux'
import { AUTH_USER_SET } from 'types'
import { firebase } from '../firebase'


export const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props
    }

    render() {
      return (
        <Component />
      )
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: AUTH_USER_SET, authUser }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}
