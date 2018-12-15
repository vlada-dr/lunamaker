import * as React from 'react'
import PropTypes from 'prop-types'
import { Field, Calendar, GenderDouble } from 'ui/molecules'
import { Flex } from 'ui/atoms'
import { CheckIcon } from 'ui/icons'
import { PhotoUnload } from '../atoms'


export const Account = ({
  onChange,
  onBlur,
  onAgeChange,
  user,
  errors,
}) => (
  <Flex column width='100%' child='0.5rem 0'>
    <GenderDouble
      value={user.gender}
      onChange={onChange}
    />
    <Field
      name='displayName'
      value={user.displayName}
      onChange={onChange}
      onBlur={onBlur}
      error={errors.name}
      label="Ім'я"
    />
    <Field
      name='email'
      value={user.email}
      onChange={onChange}
      onBlur={onBlur}
      error={errors.email}
      label="Ім'я користувача"
    />
    <Calendar
      name='age'
      value={user.age}
      onChange={onAgeChange}
      label='День народження'
      error={errors.age}
    />
    <Field
      name='photoURL'
      value={user.photoURL}
      onChange={onChange}
      onBlur={onBlur}
      error={errors.photoURL}
      label='Фото'
    />
    <CheckIcon />
  </Flex>
)

Account.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onAgeChange: PropTypes.func,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    gender: PropTypes.number,
    email: PropTypes.string,
    age: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    gender: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.string,
  }),
}

Account.defaultProps = {
  onChange: null,
  onBlur: null,
  onAgeChange: null,
  errors: {
    photoURL: null,
    displayName: null,
    gender: null,
    email: null,
    age: null,
  },
}
