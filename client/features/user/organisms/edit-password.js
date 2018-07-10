import * as React from 'react'
import { Field } from 'ui/molecules'
import { Flex } from 'ui/atoms'
import { withState, withHandlers, compose } from 'recompose'
import { validate } from 'features/validations'


const enhance = compose(
  withState('password', 'setPassword', {
    old: '',
    created: '',
    repeat: '',
  }),
  withState('errors', 'setErrors', {}),
  withHandlers({
    update: ({ password, setPassword }) => (name, value) => {
      const updated = {
        ...password,
        [name]: value,
      }

      setPassword(updated)
    },
    check: ({ errors, setErrors }) => (name, value) => {
      const validations = {
        created: 'complexity',
        repeat: 'compare',
      }
      const updated = {
        ...errors,
        [name]: validate(validations[name], value),
      }

      setErrors(updated)
    },
  }),
)

export const Password = enhance(({
  password: { old, created, repeat }, update,
  errors, check,
}) => (
  <Flex column width='100%' child='0.5rem 0'>
    <Field
      name='old'
      value={old}
      onChange={({ target: { value } }) => update('old', value)}
      label='Старий пароль'
      type='password'
    />
    <Field
      name='created'
      value={created}
      onChange={({ target: { value } }) => update('created', value)}
      onBlur={() => check('created', created)}
      error={errors.created}
      label='Новий пароль'
      type='password'
    />
    <Field
      name='repeat'
      value={repeat}
      onChange={({ target: { value } }) => update('repeat', value)}
      onBlur={() => check('repeat', [created, repeat])}
      error={errors.repeat}
      label='Повторіть пароль'
      type='password'
    />
  </Flex>
))
