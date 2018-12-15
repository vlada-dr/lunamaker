import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { PresentForm } from '../organisms'


const enhance = compose(
 // withFirebase,
 // withHandlers({
  //  createPresent: ({ firebase }) => (present) => firebase.push('presents', present),
 // }),
)

const CreatePresentView = ({ createPresent }) => (
  <PresentForm
    propsSubmit={createPresent}
    title='Додати подарунок'
    touched={{}}
  />
)

CreatePresentView.propTypes = {
  createPresent: PropTypes.func,
}

CreatePresentView.defaultProps = {
  createPresent: null,
}

export const NewPresent = enhance(CreatePresentView)

