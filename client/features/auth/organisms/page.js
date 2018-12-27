import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { LoginTemplate } from 'ui/templates'
import { unload } from '../actions'
import { Login, Register } from './'


const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  redirectTo: state.common.redirectTo,
})

const mapDispatchToProps = (dispatch) => ({
  onUnload: () => dispatch(unload()),
})


export class Log extends React.Component {
    state = { login: true }
    componentWillUnmount = () => this.props.onUnload()
    onClick = () => this.setState((prevState) => ({ login: !prevState.login }));
    render() {
      const { login } = this.state
      const { redirectTo, isAuth } = this.props

      return (<LoginTemplate onClick={this.onClick} tab={login ? 'Реєстрація' : 'Вхід'}>
        {
                login ? <Login /> : <Register />
            }
        {
                isAuth && <Redirect to={redirectTo} />
            }
              </LoginTemplate>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
