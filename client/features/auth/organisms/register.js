import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { auth } from 'api'
import { Button, Layout } from 'ui/atoms'
import { validate } from 'features/validations'
import { register } from '../actions'


const mapDispatchToProps = (dispatch) => ({ onRegister: (user) => dispatch(register(user)) })

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStateHandlers(
    ({ user = {}, errors = {}, touched = {} }) => ({ user, errors, touched }),
    {
      updateField: ({ user, touched }) => (name, value) => ({
        user: { ...user, [name]: value },
        touched: { ...touched, [name]: true },
      }),
    },
  ),
  withHandlers({
    onChange: ({ errors, updateField }) => ({ target: { name, value } }) => {
      updateField(name, value)
    },
    onSubmit: ({ user, touched, errors, onRegister }) => (e) => {
      e.preventDefault()
      auth.register({ user });
    },
  }),
)

const RegisterView = ({ valid, errors, onSubmit, onChange, updateField, compare, user }) => {
  const { username, email, gender, password, password2 } = user

  return (
    <Layout onSubmit={onSubmit} flow="column" align='center' width='100%' gap={1.6} padding={2}>
      <RegisterField
        name='username'
        value={username}
        onChange={onChange}
        onBlur={valid}
        error={errors.name}
        icon='User'
        label={'Ім\'я'}
      />
      <RegisterField
        name='email'
        value={email}
        onChange={onChange}
        onBlur={valid}
        error={errors.email}
        icon='Email'
        label='Електронна адреса'
      />
      <RegisterField
        name='password'
        value={password}
        onChange={onChange}
        onBlur={valid}
        error={errors.password}
        icon='Password'
        label='Пароль'
      />
      <Button shine darkblue onClick={onSubmit}>Зареєструватися</Button>
    </Layout>
  )
}

RegisterView.propTypes = {
  compare: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  valid: PropTypes.func,
  updateField: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.string),
}

RegisterView.defaultProps = {
  compare: null,
  errors: null,
  onSubmit: null,
  onChange: null,
  valid: null,
  updateField: null,
  user: null,
}

export const Register = enhance(RegisterView)
