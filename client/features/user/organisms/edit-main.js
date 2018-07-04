import * as React from 'react'
import { Field, Calendar, GenderDouble } from '../../../ui/molecules'
import { Flex } from '../../../ui/atoms'
import { PhotoUnload } from '../atoms'
const Account = ({ onChange, onBlur, onAgeChange, user, errors }) =>
    <Flex column width='100%' child='0.5rem 0'>
        <GenderDouble
            value={user.gender}
            onChange={onChange}
        />
        <Field name='name'
            value={user.name}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.name}
            label="Ім'я" />
        <Field name='email'
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
        <Field name='photo'
            value={user.photo}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.photo}
            label='Фото'
        />
    </Flex>

export default Account;