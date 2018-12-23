import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import img from '../../styles/home-image.jpg'
import { Icon } from '../atoms'
import { Slider, GenderTriple } from '../molecules'
import { Autocomplete } from '../organisms'


import { filterOn, filterOff, changeSearch, searchPresent, refreshTags } from '../../features/present/actions'
import { getTags } from '../../features/tag/actions'


const mapStateToProps = (state) => ({
  search: state.present.search,
  isFilter: state.present.isFilter,
  likes: state.tag.likes,
  celebrations: state.tag.holidays,
})


const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  filterOff: () => dispatch(filterOff()),
  onChange: (key, value) => dispatch(changeSearch(key, value)),
  onSearch: (present) => dispatch(searchPresent(present)),
  onTagsChange: (tag) => dispatch(refreshTags(tag)),
})

class Filter extends Component {
  componentDidMount = () => this.props.getTags()


  onChange = (name, value) => this.props.onChange(name, value)

  onRangeChange = (value) => {
    this.props.onChange('startAge', value[0])
    this.props.onChange('endAge', value[1])
  }

  onAddTag = (tag) => {
    const tags = this.props.search.tags.concat(tag)

    this.props.onTagsChange(tags)
  }

  onDeleteTag = (newTag) => {
    const tags = this.props.search.tags.filter((tag) => tag.id !== newTag.id)

    this.props.onTagsChange(tags)
  }

  search = () => {
    const { gender, startAge, endAge } = this.props.search
    const queryString = `gender=${gender}&startAge_gte=${startAge}&startAge_lte=${endAge}&endAge_gte=${startAge}&endAge_lte=${endAge}`

    this.props.onSearch(queryString)
  }

  closeSearch = () => this.props.filterOff()

  render() {
    const { isFilter, search, likes, celebrations } = this.props

    return (
      <Wrapper isFilter={isFilter} >
        {isFilter ? (
          <Form>
            <Main>
              <GenderTriple
                value={search.gender}
                onChange={this.onChange}
              />
              <Slider
                startAge={search.startAge}
                endAge={search.endAge}
                onChange={this.onRangeChange}
              />
            </Main>
            <Autocomplete
              width='25%'
              suggestions={likes}
              title='Подобається'
              onAdd={this.onAddTag}
              onDelete={this.onDeleteTag}
            />
            <Autocomplete
              width='25%'
              suggestions={celebrations}
              title='Свята'
              onAdd={this.onAddTag}
              onDelete={this.onDeleteTag}
            />
            <Icons>
              <Icon css={Scale} name='Check' size='2.5vh' color='#1C1C59' onClick={this.search} />
              <Icon css={Scale} name='X' size='2vh' color='#1C1C59' onClick={this.closeSearch} />
            </Icons>
          </Form>
      ) : undefined}
      </Wrapper>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
// render() {
//    const { searchParams, isFilter, searchChange } = this.props.presentsStore;
//    const { likes, celebrations } = this.props.tagsStore;
//    return <Wrapper isFilter={isFilter} >
//        {isFilter ? <Form>
//            <Main>
//                <GenderTriple
//                    value={searchParams.gender}
//                    onChange={searchChange}
//                />
//                <Slider
//                    startAge={searchParams.startAge}
//                    endAge={searchParams.endAge}
//                    onChange={searchChange}
//                /> </Main>
//            <Autocomplete width='25%'
//                suggestions={likes}
//                title='Подобається'
//            />
//            <Autocomplete width='25%'
//                suggestions={celebrations}
//                title='Свята' />
//            <Icons>
//                <Icon css={Scale} name='Check' size='2.5vh' color='#1C1C59' onClick={this.search} />
//                <Icon css={Scale} name='X' size='2vh' color='#1C1C59' onClick={this.openSearch} />
//            </Icons>
//        </Form> : undefined}
//    </Wrapper>
// }
const Scale = `
    transition: all .5s ease;
    &:hover {
        transform: scale(1.2);
    }
`

const Main = styled.div`
    width: 30%;
`

const Icons = styled.div`
    width: 10vh;
    position:absolute;
    bottom:2vh;
    margin: auto;
    left:0;
    right:0;
    display:flex;
    justify-content: space-between;
    align-items: center;
`

const Form = styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(255,255,255, 0.3);
    padding: 10vh 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Wrapper = styled.div`
    background-size: cover;
    position: relative;
    top: 0;
    z-index: 1;
    left:0;

     ${(p) => p.isFilter && css`
        position: sticky;
        left:0;
        top: 0;
            @media (max-width: 576px) {
        height: 40vh;
        background-size: 250%;
        background-position: center top;
    }
    @media (min-width: 568px) {
        height: 40vh;
        background-size: 150%;
        background-position: center top;
    }
    @media (min-width: 900px) {
        background-size: cover;
    }
    @media (min-width: 1200px)  {
        height: 45vh;
    }
    `}
`


Filter.propTypes = {
  isFilter: PropTypes.bool,
}

Filter.defaultProps = {
  isFilter: false,
}
