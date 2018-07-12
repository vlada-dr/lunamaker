import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { Field, Form, Slider, GenderTriple, FieldArea } from 'ui/molecules'
import { Autocomplete } from 'ui/organisms'
import { ProfileTemplate } from 'ui/templates'
import { validate } from 'features/validations'


const enhance = compose(
  firebaseConnect(['tags']),
  connect(({ firebase }) => ({
    likes: firebase.data.tags,
    celebrations: firebase.data.tags,
  })),
  withStateHandlers(
    ({ errors, touched, present }) => ({ errors, touched, present: { } }),
    {
      updateField: ({ present, touched }) => (name, value) => ({
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
    onAddTag: ({ present, updateField }) => (tag) => updateField('tags', present.tags.concat(tag)),
    onDeleteTag: ({ present, updateField }) => (tag) => {
      const newTags = present.tags.filter((t) => t.id !== tag.id)

      updateField('tags', newTags)
    },
    valid: ({ setError }) => ({ target: { name, value } }) => setError(name, value),
    onSubmit: ({ present, touched, errors, propsSubmit }) => (e) => {
      e.preventDefault()
      const all = Object.keys(touched).length === 4
      const withoutErrors = Object.values(errors).map((k) => k.length === 0)

      if (all && withoutErrors) {
        propsSubmit(present)
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
  title,
  likes,
  celebrations,
}) => (
  <ProfileTemplate>
    <Form submit={onSubmit} header={title} >
      <Field
        name='title'
        value={present.title}
        onChange={onChange}
        onBlur={valid}
        error={errors.title}
        label='Назва'
      />
      <FieldArea
        name='content'
        value={present.content}
        onChange={onChange}
        onBlur={valid}
        error={errors.content}
        label='Інформація'
      />
      <Field
        name='photo'
        value={present.photo}
        onChange={onChange}
        onBlur={valid}
        error={errors.photo}
        label='Фото'
      />
      <GenderTriple
        value={present.gender}
        onChange={updateField}
      />
      <Slider
        start={present.startAge}
        end={present.endAge}
        onChange={onRangeChange}
      />
      <Tags>
        <Autocomplete
          width='47%'
          suggestions={likes}
          title='Подобається'
          onAdd={onAddTag}
          onDelete={onDeleteTag}
        />
        <Autocomplete
          width='47%'
          suggestions={celebrations}
          title='Свята'
          onAdd={onAddTag}
          onDelete={onDeleteTag}
        />
      </Tags>
    </Form>
  </ProfileTemplate>
)

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
  title: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object),
  celebrations: PropTypes.arrayOf(PropTypes.object),
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
    tags: [],
  },
  updateField: null,
  likes: null,
  celebrations: null,
}
export const PresentForm = enhance(FormView)

const Tags = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
