import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import { Input } from '../atoms'
import { Tag } from '../molecules'


export default class Autocomplete extends Component {
   state = {
     value: '',
     data: [],
     suggested: [],
   }

    addTag = (tag) => {
      const { suggested, data } = this.state,
        tags = suggested
        tags.splice(suggested.findIndex((x) => x.id === tag.id), 1)
        data.map((x) => x.id).indexOf(tag.id) === -1
            && this.setState({
              data: data.concat({ id: tag.id, name: tag.name, type: tag.type }),
              suggested: tags,
            })
        this.props.onAdd(tag)
    }

    deleteTag = (tag) => {
      const tags = this.state.data
        tags.splice(tags.findIndex((x) => x.id === tag.id), 1)
        this.setState({ data: tags })
      this.props.onDelete(tag)
    }

    onChange = (e) => {
      const value = e.target.value
        this.setState({ value })
        this.renderOffers(value.trim().toLowerCase())
    }

    renderOffers = (input) => {
      const suggested = input.length === 0 ? []
                : this.props.suggestions.filter((item) => item.name.toLowerCase().slice(0, input.length) === input
                    && this.state.data.every((x) => x.name !== item.name))
        this.setState({ suggested })
    };


    render() {
      const { data, suggested } = this.state
        return (<Auto width={this.props.width}>
            <Input rounded
                name="tags"
                placeholder={this.props.title}
                value={this.state.value}
                onChange={this.onChange} />
            <Scrollbars style={style}>
            <Suggestions>
                {data.map(tag =>
                        <Tag check
                            key={tag.id}
                            name={tag.name}
                            delete={() => this.deleteTag(tag)}
                        />)}
                {suggested.map(tag =>
                        <Tag
                            key={tag.id}
                            name={tag.name}
                            add={() => this.addTag(tag)} />)}
            </Suggestions>
            </Scrollbars>
            </Auto>);
    }
}

const style = {
  width: '100%',
  height: '10rem',
  marginTop: '1rem',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '2.5vh',
  overflow: 'hidden',
}

const Auto = styled.div`
   width: ${(p) => p.width};
    ${Input}{
        width: 100%;
        height: 3.6rem;
    }
    height: 80%;
`
const Suggestions = styled.div`
    padding: 1.5vh 1vw;
`

Autocomplete.propTypes = {
  suggestions: PropTypes.node,
  title: PropTypes.string,
  width: PropTypes.string,
}

Autocomplete.defaultProps = {
  title: null,
  width: '100%',
}
