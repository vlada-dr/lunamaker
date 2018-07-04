import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Field, Form, Slider, GenderTriple, FieldArea } from '../../../ui/molecules'
import { Button, Layout, Textarea } from '../../../ui/atoms'
import { Autocomplete } from '../../../ui/organisms' 
import { ProfileTemplate } from '../../../ui/templates'


export default class PresentForm extends Component {
    onChange = e => {
        let name = e.target.name,
            value = e.target.value;
        this.props.onChange(name, value);
        if (this.props.touched[name] && this.props.errors[name].length > 0) this.onBlur(e);
    }

    onBlur = e => (e.target.value.length > 0) ? this.props.onBlur(e.target.name, e.target.value) : true;
    onRangeChange = value => {
        this.props.onChange('startAge', value[0])
        this.props.onChange('endAge', value[1])
    }
    onAddTag = tag => {
        let tags = this.props.present.tags.concat(tag);
        this.props.onTagsChange(tags)
    }
    onDeleteTag = newTag => {
        let tags = this.props.present.tags.filter(tag => tag.id !== newTag.id);
        this.props.onTagsChange(tags)
    }
    onSelectChange = (name, value) => {
        this.props.onChange(name, value)
        this.props.onBlur(name, value)
    }
    render() {
        const onFieldChange = this.onChange,
            onFieldBlur = this.onBlur;
        const { present, onSubmit, errors, likes, celebrations, title } = this.props;
        return (
            <ProfileTemplate>
                <Form submit={onSubmit} title={title} >
                    <Field name='title'
                        value={present.title}
                        onChange={onFieldChange}
                        onBlur={onFieldBlur}
                        error={errors.title}
                        label='Назва' />
                    <FieldArea name='content'
                        value={present.content}
                        onChange={onFieldChange}
                        onBlur={onFieldBlur}
                        error={errors.content}
                        label='Інформація' />
                    <Field name='photo'
                        value={present.photo}
                        onChange={onFieldChange}
                        onBlur={onFieldBlur}
                        error={errors.photo}
                        label='Фото'
                    />
                    <GenderTriple
                        value={present.gender}
                        onChange={this.onSelectChange}
                    />
                    <Slider
                        startAge={present.startAge}
                        endAge={present.endAge}
                        onChange={this.onRangeChange}
                    />
                    <Tags>
                        <Autocomplete width='47%'
                            suggestions={likes}
                            title='Подобається'
                            onAdd={this.onAddTag}
                            onDelete={this.onDeleteTag}
                        />
                        <Autocomplete width='47%'
                            suggestions={celebrations}
                            title='Свята'
                            onAdd={this.onAddTag}
                            onDelete={this.onDeleteTag}
                        />
                    </Tags>
                </Form>
            </ProfileTemplate>
        )
    }
}

const Tags = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

