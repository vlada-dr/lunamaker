import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { withAuthentication } from 'features/auth'
import { changeSearchInput, filterOn, searchPresent } from 'features/present/actions'
import { logout } from 'features/auth/actions'
import { IconLink, Name, Flex } from 'ui/atoms'
import { Avatar } from 'ui/molecules'
import { Search } from 'ui/organisms'


const mapStateToProps = (state) => ({
  id: state.common.user ? state.common.user.uid : null,
  isAuth: state.auth.isAuth,
  isFilter: state.present.isFilter,
  photo: state.common.user ? state.common.user.photoURL : null,
  search: state.present.search.title,
  gender: state.common.user ? state.common.user.gender : null,
})


const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeSearchInput(value)),
  filterOn: () => dispatch(filterOn()),
  logout: () => dispatch(logout()),
  onSearch: (present) => dispatch(searchPresent(present)),
})


class MenuView extends Component {
  state = {
    windowPosition: window.pageYOffset,
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () => window.removeEventListener('scroll', this.handleScroll)

  onChange = (e) => this.props.onChange(e.target.value)

  onSearch = () => this.props.onSearch(this.props.search)

  filterOn = () => this.props.filterOn()

  logout = () => this.props.logout()

  handleScroll = () => this.setState({ windowPosition: window.pageYOffset })

  render() {
    const { isAuth, gender, photo, id, search, isFilter, match } = this.props
    const scroll = this.state.windowPosition > 0 && !isFilter

    return (
      <MenuWrapper scroll={scroll}>
        <Flex width='75%' >
          <Link to="/"><Name size='2rem' /></Link>
          {
            match.path === '/' && (
              <Search
                isFilter={isFilter}
                onChange={this.onChange}
                openSearch={this.filterOn}
                onSearch={this.onSearch}
                value={search}
              />
            )
          }
        </Flex>
        {
          isAuth ? (
            <Flex w='25%' child='1rem'>
              <Link to={`/user/${id}`}>
                <Avatar src={photo} size='3vh' gender={gender} />
              </Link>
              <IconLink onClick={this.logout} to='/login' name='Exit' />
            </Flex>
          ) : <IconLink to='/login' name='Enter' />
        }
      </MenuWrapper>
    )
  }
}

export const Menu = compose(
  withAuthentication,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuView)

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.25s ease;
  width: 100%;
  height: 10vh;
  padding: 0 5vw;
  z-index: 2;
  ${(p) => p.scroll && css`
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    z-index: 100;
  `}
`


MenuView.propTypes = {
  filterOn: PropTypes.func,
  gender: PropTypes.number,
  id: PropTypes.string,
  isAuth: PropTypes.bool,
  isFilter: PropTypes.bool,
  logout: PropTypes.func,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  photo: PropTypes.string,
  search: PropTypes.string,
}

MenuView.defaultProps = {
  filterOn: null,
  gender: 0,
  id: null,
  isAuth: false,
  isFilter: false,
  logout: null,
  onChange: null,
  onSearch: null,
  photo: null,
  search: '',
}
