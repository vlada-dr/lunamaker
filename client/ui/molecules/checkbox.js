import * as React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon, Layout } from '../atoms'


const Square = styled.div`
  transition: all .3s ease-in;
  height: 1.2rem;
  width: 1.2rem;
  background: ${(p) => p.back};
  display: flex;
  align-items:center;
  border-radius: 2px;
  justify-content: center;
  & > * {
    transition: all .3s ease-in;
  }
`

const Title = styled.div`
  color: #31394D;
  padding-left: 0.5rem;
  font-weight: 500;
`


export const Checkbox = ({ active, text, checked, onClick }) => (
  <Layout flow='row' justify='center' width='100%'>
    <Square
      back={checked ? active : '#C8C8CE'}
      onClick={onClick}
    >
      <Icon name='Check' size={checked ? '1rem' : '0'} color='#fff' />
    </Square>
    <Title>{text}</Title>
  </Layout>
)

Checkbox.propTypes = {
  active: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
}

Checkbox.defaultProps = {
  active: '#5C71DB',
  checked: false,
  onClick: null,
  text: null,
}
