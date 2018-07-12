import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { auth } from 'features/firebase'
import { LoginField, Checkbox } from 'ui/molecules'
import { Button, Layout, Icon, Error, Spinner } from 'ui/atoms'
import { login } from '../actions'


const Social = () => (
  <Layout flow='row' justify='space-around' width='100%' padding={2}>
    <Icon size='5vh' name="Twitter3D" />
    <Icon size='5vh' name="Google3D" />
    <Icon size='5vh'name="Facebook3D" />
  </Layout>
)

const mapDispatchToProps = (dispatch) => ({ onLogin: (id) => dispatch(login(id)) })

const enhance = compose(
  connect(null, mapDispatchToProps),
  withState('email', 'onEmail', ''),
  withState('password', 'onPassword', ''),
  withState('error', 'setError', null),
  withState('remember', 'changeRemember', false),
  withState('loading', 'onLoading', false),
  withHandlers({
    updateEmail: ({ onEmail }) => ({ target: { value } }) => onEmail(value),
    updatePassword: ({ onPassword }) => ({ target: { value } }) => onPassword(value),
    onRemember: ({ remember, changeRemember }) => () => {
      const newValue = !remember

      changeRemember(newValue)
    },
    submitForm: ({ email, password, onLogin, remember, setError }) => (e) => {
      e.preventDefault()
      auth.doSignInWithEmailAndPassword(email, password)
        .then((res) => onLogin(res.user.uid))
        .catch((error) => setError(error))
    },
  }),
)

const LoginView = ({
  email, password, remember, error, loading,
  updateEmail, updatePassword, onRemember, submitForm,
}) => (
  <form onSubmit={submitForm}>
    <Layout flow="column" align='center' width='100%' gap={1.6} padding={2}>
      <Social />
      <LoginField
        name='email'
        value={email}
        onChange={updateEmail}
        icon='User'
        label='Імя'
      />
      <LoginField
        name='password'
        value={password}
        onChange={updatePassword}
        icon='Password'
        label='Пароль'
      />
      <Checkbox
        onClick={onRemember}
        checked={remember}
        text="Запам'ятати мене"
      />
      <Error
        error='Невірний логін або пароль'
        active={error != null}
      />
      {
        loading ? <Spinner /> : <Button shine darkblue onClick={submitForm}>Увійти</Button>
      }
    </Layout>
  </form>
)

LoginView.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool,
  onRemember: PropTypes.func,
  password: PropTypes.string.isRequired,
  remember: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
}

LoginView.defaultProps = {
  error: null,
  loading: false,
  onRemember: PropTypes.func,
  remember: false,
}

export const Login = enhance(LoginView)
