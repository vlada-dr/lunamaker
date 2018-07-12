import * as React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { rootRoutes } from 'routes'
import { db } from 'features/firebase'
import { APP_LOAD, REDIRECT, LOAD_USER } from 'types'


const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  currentUser: state.common.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: (user) => dispatch({ type: APP_LOAD, payload: user }),
})

export class Layout extends React.Component {
  componentDidMount() {
    const token = window.localStorage.getItem('jwt')

    db.onceGetUsers()
  }


  render() {
    return (
      <div>
        {rootRoutes()}
      </div>
    )
  }
}


export const App = hot(module)(() => (
  <div>
    {rootRoutes()}
  </div>
))

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
