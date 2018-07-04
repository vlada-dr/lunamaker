// / <reference path="../../index.js" />
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { update, blur } from '../../actions'

import { register } from '../actions'
import { LoginField, GenderDouble } from '../../../ui/molecules'
import { Button, Layout } from '../../../ui/atoms'
import { auth } from '../../firebase'


const mapStateToProps = (state) => ({ ...state.auth })

const mapDispatchToProps = (dispatch) => ({
  onChange: (name, value) => dispatch(update(name, value)),
  onBlur: (name, value) => dispatch(blur(name, value)),
  onSubmit: (user) => dispatch(register(user)),
})


class RegisterForm extends Component {
    onChange = (e) => {
      let name = e.target.name,
        value = e.target.value

      this.props.onChange(name, value)
      if (this.props.touched[name] && this.props.errors[name].length > 0) { this.onBlur(e)}
    }

    onBlur = (e) => (e.target.value.length > 0) && this.props.onBlur(e.target.name, e.target.value);

    submitForm = (e) => {
      e.preventDefault()
      const { email, name, password, gender, touched, errors } = this.props
      const isValid = Object.keys(touched).length === 5 && Object.values(errors).every((err) => err.length === 0)

      isValid && this.props.onSubmit({
        email, name, password, gender,
      })

    }

    isComplex = (e) => (e.target.value.length > 0)
      ? this.props.onBlur('complexity', e.target.value) : true;

    compare = (e) => (e.target.value.length > 0)
        && this.props.onBlur(
          'compare',
          [this.props.password, e.target.value],
        )

    onSelectChange = (name, value) => {
      this.props.onChange(name, value)
      this.props.onBlur(name, value)
    }

    render() {
      const { name, email, password, password2, gender, errors = {} } = this.props
      const { onChange, onSelectChange, onBlur, submitForm, isComplex, compare } = this

      return (
          <Layout onSubmit={submitForm} flow="column" align='center' width='100%' gap={1.6} padding={2}>
            <LoginField
                    name='name'
                    value={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.name}
                    icon='User'
                    label='Імя'
                    register
                  />
            <LoginField
                    name='email'
                    value={email}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.email}
                    icon='Email'
                    label='Електронна адреса'
                    register
                  />
            <LoginField
                    name='password'
                    value={password}
                    onChange={onChange}
                    onBlur={isComplex}
                    error={errors.complexity}
                    icon='Password'
                    type='password'
                    label='Пароль'
                    register
                  />
            <LoginField
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    onBlur={compare}
                    error={errors.compare}
                    icon='Password'
                    label='Повторіть пароль'
                    type='password'
                    register
                  />
            <GenderDouble
                    value={gender}
                    onChange={onSelectChange}
                  />
            <Button shine darkblue onClick={submitForm}>Зареєструватися</Button>
          </Layout>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
