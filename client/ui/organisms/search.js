import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Input } from 'ui/atoms'


const NavIcon = styled.div`
  transition: all .7s ease;
  position: absolute;
  right: 0;
  top: 0.75vh;
`

const SearchIcon = NavIcon.extend`
  opacity: 1;
`

const Right = NavIcon.extend`
  opacity: 0;
`

const NavInput = Input.extend`
  width: 100%;
  height: 100%;
  padding: 0 3vw;
  background: transparent;
  &:focus {
    outline:none;
    border: none;
    background: transparent;
  }
`

const Wrapper = styled.div`
  width: 4vh;
  height: 4vh;
  transition: all .7s ease;
  margin-left: 1vw;
  position: relative;
  ${(p) => p.open && css`
    @media (orientation: portrait) {
        width: 30vw;
    }
    @media (orientation: landscape) {
        width: 20vw;
    }
    ${Right} { opacity: 1; }
    ${SearchIcon} { opacity: 0; }
  `}
`

export const Search = ({ isFilter, value, onChange, onSearch, openSearch }) => (
  <Wrapper open={isFilter}>
    <NavInput
      type="search"
      ref={(input) => {
          this.search = input
        }}
      value={value}
      placeholder="Пошук"
      onChange={onChange}
    />
    {
      isFilter ? (
        <Right>

        </Right>
      ) : (
        <SearchIcon>

        </SearchIcon>
      )
    }
  </Wrapper>
)

Search.propTypes = {
  isFilter: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  openSearch: PropTypes.func,
  onSearch: PropTypes.func,
}

Search.defaultProps = {
  isFilter: false,
  value: '',
  onChange: null,
  openSearch: null,
  onSearch: null,
}
