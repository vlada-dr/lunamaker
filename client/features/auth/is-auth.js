import * as React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({ isAuth: state.firebase.profile.uid })

export const Authorized = (WrappedComponent) => {
  /* eslint-disable react/prefer-stateless-function */
  class Wrapper extends React.Component {
    render() {
      const { isAuth } = this.props

      if (isAuth) {
        return <WrappedComponent {...this.props} />
      }
      return <Redirect to="/" />
    }
  }


  return connect(mapStateToProps)(Wrapper)
}
