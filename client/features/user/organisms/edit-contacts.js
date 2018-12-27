import * as React from 'react'
import { Flex, Input } from 'ui/atoms'


export const Password = ({ onChangePassword, isComplex, compare, onChange, errors, password }) => (<Flex column width='100%' child='0.5rem 0'>
  <Input
    name='oldPassword'
    value={password.oldPassword}
    onChange={onChange}
    label="Старий пароль"
    type='password'
  />
  <Input
    name='newPassword'
    value={password.newPassword}
    onChange={onChangePassword}
    onBlur={isComplex}
    error={errors.complexity}
    label="Новий пароль"
    type='password'
  />
  <Input
    name='repeatPassword'
    value={password.repeatPassword}
    onChange={onChangePassword}
    onBlur={compare}
    error={errors.compare}
    label='Повторіть пароль'
    type='password'
  />
</Flex>)

