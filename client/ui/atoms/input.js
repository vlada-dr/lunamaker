import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { color } from '../theme'


export const Input = styled.input`
  display: flex;
  flex: 1;
  padding: 16px;
  font-size: 16px;
  color: ${_color.darkGray};
  border: 1px solid ${_color.gray};   
  overflow: hidden;
  outline: none;
  text-overflow: ellipsis;
  -webkit-appearance: none;

  &:focus {
    outline:none;
    border: 1px solid ${_color.blue};
  }
`;
