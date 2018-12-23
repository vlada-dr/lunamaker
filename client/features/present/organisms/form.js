import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withHandlers , withProps} from 'recompose'
import { Field, Form, Slider, GenderTriple, FieldArea } from 'ui/molecules'
import { Select } from 'ui/organisms'
import {Button, Input,Textarea, Layout } from 'ui/atoms'
import { ProfileTemplate } from 'ui/templates'
import { validate } from 'features/validations'

function capitalizeFirstLetters(str){
  return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
    return letter.toUpperCase();
  })
}


const enhance = compose(
  withStateHandlers(
    ({ errors }) => ({ errors }),
    {
      updateField: ({ touched, present }) => (name, value) => ({
        present: { ...present, [name]: value },
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
    onRangeChange: ({ updateField }) => ({ start, end }) => {
      updateField('startAge', start)
      updateField('endAge', end)
    },
    onPriceChange: ({ updateField }) => ({ target: { value } }) => {
      updateField('price', value.replace(/[^\d+]/, ''));
    },
    onAddTag: ({ present, updateField }) => (tag) => updateField('tagList', present.tagList.concat(tag)),
    onDeleteTag: ({ present, updateField }) => (tag) => {
      const newTags = present.tagList.filter((t) => t !== tag);

      updateField('tagList', newTags)
    },
    valid: ({ setError }) => ({ target: { name, value } }) => setError(name, value),
    onSubmit: ({ present, touched, errors, propsSubmit }) => (e) => {
      e.preventDefault();
      const withoutErrors = Object.values(errors).map((k) => k.length === 0);

      if (withoutErrors) {
        propsSubmit({
          present: {
            ...present,
            images: present.images.split('\n'),
            tagList: [...present.tags, ...present.tagInput.split(',')],
          },
        })
      }
    },
  }),
)

const FormView = ({
  onChange,
  onRangeChange,
  onAddTag,
  onDeleteTag,
  valid,
  onSubmit,
  errors,
  present,
  updateField,
  tags,
  onPriceChange,
}) => (
  <>
    <Layout flow='row' gap={24}>
      <Layout flow='column' submit={onSubmit} gap={24}>
        <h3>
          Основна iнформацiя
        </h3>
        <Layout flow='row' gap={24}>
          <Input
            name='title'
            value={present.title}
            onChange={onChange}
            onBlur={valid}
            error={errors.title}
            placeholder='Назва'
          />
          <Input
            name='price'
            value={present.price}
            onChange={onPriceChange}
            onBlur={valid}
            error={errors.price}
            placeholder='Цiна'
          />
        </Layout>
        <Input
          name='description'
          value={present.description}
          onChange={onChange}
          onBlur={valid}
          error={errors.description}
          placeholder={`Прев'ю`}
        />
        <Textarea
          name='body'
          value={present.body}
          onChange={onChange}
          onBlur={valid}
          error={errors.body}
          placeholder='Опис'
        />
        <Textarea
          name='images'
          value={present.images}
          onChange={onChange}
          onBlur={valid}
          error={errors.images}
          placeholder='Фото'
        />

      </Layout>
      <Layout flow='column' submit={onSubmit} gap={24}>
      <h3>
          Теги
        </h3>
        <GenderTriple
          value={present.gender}
          onChange={updateField}
        />
        <Slider
          start={present.startAge}
          end={present.endAge}
          onChange={onRangeChange}
        />
        <Input
          name='tagInput'
          value={present.tagInput}
          onChange={onChange}
          placeholder={`Роздiлiть теги комами`}
        />
        <Tags>
          {
            tags.map(t => (
              <Button
                secondary={!present.tagList || !present.tagList.includes(t)}
                key={t}
                onClick={() => present.tagList.includes(t) ? onDeleteTag(t) : onAddTag(t)}
              >
                #{t}
              </Button>
            ))
          }
        </Tags>
    <h3>
      Контакти
    </h3>
    <Textarea
      name='contacts'
      value={present.contacts}
      onChange={onChange}
      error={errors.contacts}
      placeholder='Контакти'
      style={{ width: '100%'}}
    />

      </Layout>
    </Layout>
    <Button onClick={onSubmit} fluid uppercase>
      Запропонувати
    </Button>
  </>
);

FormView.propTypes = {
  onChange: PropTypes.func,
  onRangeChange: PropTypes.func,
  onAddTag: PropTypes.func,
  onDeleteTag: PropTypes.func,
  valid: PropTypes.func,
  onSubmit: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  present: PropTypes.objectOf(PropTypes.any),
  updateField: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string),
}

FormView.defaultProps = {
  onChange: null,
  onRangeChange: null,
  onAddTag: null,
  onDeleteTag: null,
  valid: null,
  onSubmit: null,
  errors: {},
  present: {
    tagList: [],
  },
  updateField: null,
  tags: [],
}
export const PresentForm = enhance(FormView)

const Tags = styled.div`
    & > * {
      margin: 4px;
    }
`
