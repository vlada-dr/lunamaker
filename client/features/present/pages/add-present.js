import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PresentForm } from '../organisms'
import { createForm, add, edit, update, blur, refreshTags } from '../actions'


const mapStateToProps = (state) => ({
  present: state.present.edit,
  errors: state.present.edit.errors,
  touched: state.present.edit.touched,
  likes: state.tag.likes,
  celebrations: state.tag.holidays,
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (name, value) => dispatch(update(name, value)),
  onBlur: (name, error) => dispatch(blur(name, error)),
  onLoad: () => dispatch(createForm('new')),
  onSubmit: (present) => dispatch(add(present)),
  onTagsChange: (tag) => dispatch(update('tags', tag)),
})

class NewPresent extends Component {
    componentWillMount = () => this.props.onLoad()

    onSubmit = (e) => {
      e.preventDefault()
      const { present, touched, errors } = this.props
      const isValid = Object.keys(touched).length === 4 && Object.values(errors).every((err) => err.length === 0)

      isValid && this.props.onSubmit(present)
    }

    render() {
      const { present, touched, errors, likes, celebrations } = this.props

      return (
        <PresentForm
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onTagsChange={this.props.onTagsChange}
          onSubmit={this.onSubmit}
          title='Додати подарунок'
          present={present}
          touched={touched}
          errors={errors}
          likes={likes}
          celebrations={celebrations}
        />
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPresent)
