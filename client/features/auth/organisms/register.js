import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { auth } from 'features/firebase'
import { RegisterField, GenderDouble } from 'ui/molecules'
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
      setError: ({ errors }) => (name, value) => ({
        errors: { ...errors, [name]: validate(name, value) },
      }),
    },
  ),
  withHandlers({
    onChange: ({ errors, updateField, setError }) => ({ target: { name, value } }) => {
      updateField(name, value)
      if (errors[name]) setError(name, value)
    },

    compare: ({ user: { password }, setError }) => ({ target }) => (
      setError(target.name, [target.value, password])
    ),

    valid: ({ setError }) => ({ target: { name, value } }) => setError(name, value),

    onSubmit: ({ user, touched, errors, onRegister }) => (e) => {
      e.preventDefault()
      const all = Object.keys(touched).length === 5
      const withoutErrors = Object.values(errors).map((k) => k.length === 0)

      if (all && withoutErrors) {
        auth.doCreateUserWithEmailAndPassword(user.email, user.password)
          .then((res) => onRegister({ uid: res.user.uid, ...user }))
      }
    },
  }),
)

const RegisterView = ({ valid, errors, onSubmit, onChange, updateField, compare, user }) => {
  const { name, email, gender, password, password2 } = user

  return (
    <Layout onSubmit={onSubmit} flow="column" align='center' width='100%' gap={1.6} padding={2}>
      <RegisterField
        name='name'
        value={name}
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
      <RegisterField
        name='password2'
        value={password2}
        onChange={onChange}
        onBlur={compare}
        error={errors.password2}
        icon='Password'
        label='Повторіть пароль'
      />
      <GenderDouble
        value={gender}
        onChange={updateField}
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
