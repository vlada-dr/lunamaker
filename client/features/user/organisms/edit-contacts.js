import * as React from 'react'
import { Field } from '../../../ui/molecules'
import { Flex } from '../../../ui/atoms'

const Password = ({ onChangePassword, isComplex, compare, onChange, errors, password }) =>
    <Flex column width='100%' child='0.5rem 0'>
        <Field name='oldPassword'
            value={password.oldPassword}
            onChange={onChange}
            label="Старий пароль"
            type='password'
        />
        <Field name='newPassword'
            value={password.newPassword}
            onChange={onChangePassword}
            onBlur={isComplex}
            error={errors.complexity}
            label="Новий пароль"
            type='password'
        />
        <Field name='repeatPassword'
            value={password.repeatPassword}
            onChange={onChangePassword}
            onBlur={compare}
            error={errors.compare}
            label='Повторіть пароль'
            type='password'
        />
    </Flex>

export default Password;

