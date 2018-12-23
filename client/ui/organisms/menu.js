import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { changeSearchInput, filterOn, searchPresent } from 'features/present/actions'
import { logout } from 'features/auth/actions'
import { Logo } from 'ui/atoms'
import { Avatar } from 'ui/molecules'
import { Search } from 'ui/organisms'


const mapStateToProps = (state) => ({
  id: state.common.user ? state.common.user.username : null,
  isAuth: state.common.user !== null,
  isFilter: state.isFilter,
  user: state.common.user,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeSearchInput(value)),
  filterOn: () => dispatch(filterOn()),
  logout: () => dispatch(logout()),
  onSearch: (present) => dispatch(searchPresent(present)),
});

const MenuLink = styled(Link)`
  font-family: ${_font.lato};
  margin: 0 24px;
`;

class MenuView extends Component {
  state = {
    windowPosition: window.pageYOffset,
  };

  onChange = (e) => this.props.onChange(e.target.value)

  onSearch = () => this.props.onSearch(this.props.search)

  filterOn = () => this.props.filterOn()

  logout = () => this.props.logout()

  render() {
    const { isAuth, user, gender, photo, id, search, isFilter, match } = this.props
    const scroll = this.state.windowPosition > 0 && !isFilter

    return (
      <MenuWrapper>
        <div>

          <MenuLink to="">
          Про нас
          </MenuLink>
          <MenuLink to="/presents/new">
          Запропонуйте подарунок
          </MenuLink>
        </div>
        <Logo />
        <div>
          <MenuLink to="">
          Пошук
          </MenuLink>
          <MenuLink to="">
          Улюбленi
          </MenuLink>
        </div>
      </MenuWrapper>
    )
  }
}

export const Menu = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(MenuView);

const MenuWrapper = styled.div`
   box-shadow: 0 1px 0 0 rgba(0,0,0,0.1);
  
  & > div {
    display: flex;
    width: calc(50% - 100px);
    
    &:last-child {
      justify-content: flex-end;
    }
  }
  
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: white;
  padding: 0 64px;
`;

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
};

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
