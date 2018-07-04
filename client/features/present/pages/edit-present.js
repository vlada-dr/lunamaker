import React, { Component } from 'react'
import { connect } from 'react-redux';

import { PresentForm } from '../organisms'
import { createForm, add, edit, update, blur, refreshTags } from '../actions';

const mapStateToProps = state => ({
    present: state.present.edit,
    errors: state.present.edit.errors,
    touched: state.present.edit.touched,
    likes: state.tag.likes,
    celebrations: state.tag.holidays
});

const mapDispatchToProps = dispatch => ({
    onChange: (name, value) => dispatch(update(name, value)),
    onBlur: (name, error) => dispatch(blur(name, error)),
    onLoad: () => dispatch(createForm('edit')),
    onSubmit: present => dispatch(edit(present)),
    onTagsChange: tag => dispatch(update('tags', tag))
});

class EditPresent extends Component {
    componentWillMount = () => this.props.onLoad()

    onSubmit = e => {
        e.preventDefault();
        const { present, touched, errors } = this.props,
            { title, content, startAge, endAge, id, gender, tags, photo } = this.props.present;
        const isValid = Object.values(errors).every(err => err.length === 0);
        isValid && this.props.onSubmit({ title, content, startAge, endAge, id, gender, tags, photo });
    }
    render() {
        const { present, touched, errors, likes, celebrations } = this.props;
        return <PresentForm
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onTagsChange={this.props.onTagsChange}
            onSubmit={this.onSubmit}
            title='Редагувати'
            present={present}
            touched={touched}
            errors={errors}
            likes={likes}
            celebrations={celebrations}
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPresent);
