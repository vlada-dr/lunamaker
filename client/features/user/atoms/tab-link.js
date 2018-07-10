import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const Tab = styled(Link)`
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  height: 5vh;
  justify-content: center;
  align-items: center;
  a {
    color: #888890;
    &:hover, &:active {
      color: #888890;
    }
  }
`

export const TabLink = ({ to, title }) => <Tab to={to}>{title}</Tab>

TabLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
