import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const Textarea = styled.textarea`
  display: flex;
  flex: 1 0 0px;
  padding: 16px;
  font-size: 16px;
  color: ${_color.darkGray};
  border: 1px solid ${_color.gray};   
  overflow: hidden;
  outline: none;
  text-overflow: ellipsis;
  -webkit-appearance: none;
  min-height: 100px;

  &:focus {
    outline:none;
    border: 1px solid ${_color.blue};
  }
`;
