import * as React from 'react'
import PropTypes from 'prop-types'
import { Flex, Input } from 'ui/atoms'
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
    <Input
      name='displayName'
      value={user.displayName}
      onChange={onChange}
      onBlur={onBlur}
      error={errors.name}
      label="Ім'я"
    />
    <Input
      name='email'
      value={user.email}
      onChange={onChange}
      onBlur={onBlur}
      error={errors.email}
      label="Ім'я користувача"
    />
    <Input
      name='age'
      value={user.age}
      onChange={onAgeChange}
      label='День народження'
      error={errors.age}
    />
    <Input
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
