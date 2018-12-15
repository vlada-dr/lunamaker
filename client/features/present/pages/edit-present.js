import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { PresentForm } from '../organisms'


const enhance = compose(
  connect((state, props) => ({
    id: props.match.params.id,
    present: state.data.presents[props.match.params.id],
  })),
 // withHandlers({
 //   updatePresent: ({ firebase, id }) => (present) => firebase.set(`presents/${id}`, present),
 // }),
)

const initialTouched = {
  title: true,
  content: true,
  photo: true,
  gender: true,
}

const UpdatePresentView = ({ updatePresent, present }) => (
  <PresentForm
    propsSubmit={updatePresent}
    present={present}
    title='Редагувати'
    touched={initialTouched}
  />
)

UpdatePresentView.propTypes = {
  present: PropTypes.objectOf(PropTypes.string),
  updatePresent: PropTypes.func,
}

UpdatePresentView.defaultProps = {
  present: {},
  updatePresent: null,
}

export const EditPresent = enhance(UpdatePresentView)
