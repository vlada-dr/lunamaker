﻿export const validate = (name, value) => {
  const error = String(value).replace(/\s+/g, '').length == 0
    ? 'Заповніть поле' : rules[name](value)

  return error
}


const rules = {
  name: (value) => {
    const error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть ім'я"

    return error
  },
  displayName: (value) => {
    const error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : "Введіть ім'я"

    return error
  },
  email: (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/
    // Пропускаем до 15 символов a-z0-9_- перед собачкой,
    // также это может быть до 4 слов, разделенных точками.
    // Затем собачка и имя домена (от 1 до 15 символов).
    // Затем доменная зона - от 2 до 6 латинских букв
    const error = regexp.test(value) ? '' : 'Введіть коректний email'

    return error
  },
  photo: (value) => {
    const regexp = (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)
    const error = regexp.test(value) ? '' : 'Введіть дійсний URL'

    return error
  },
  complexity: (value) => {
    const error = value.search(/\d/) == -1
      ? 'Пароль має містити хоча б 1 цифру'
      : value.length <= 6
        ? 'Пароль має містити хоча б 6 символів' : ''

    return error
  },
  password: (value) => {
    const error = value.length <= 6
      ? 'Пароль має містити хоча б 6 символів' : ''

    return error
  },
  title: (value) => {
    const error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : 'Введіть назву'

    return error
  },
  password2: (value) => {
    const error = value[0] === value[1] ? '' : 'Паролі відрізняються'

    return error
  },
  compare: (value) => {
    const error = value[0] === value[1] ? '' : 'Паролі відрізняються'

    return error
  },
  content: (value) => {
    const error = (value.length <= 300 && value.length >= 3) ? '' : 'Введіть інформацію'

    return error
  },
  startAge: (value) => {
    const error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : 'Введіть назву'

    return error
  },
  endAge: (value) => {
    const error = (value.length <= 30 && value.length >= 3 && value.search(/\d/) == -1) ? '' : 'Введіть назву'

    return error
  },
  age: (value) => {
    const error = new Date(value) == 'Invalid Date' ? 'Некоректна дата народження' : ''

    return error
  },
  gender: (value) => (value < 3 && value > -1) ? '' : 'Некоректний вибір',
}
