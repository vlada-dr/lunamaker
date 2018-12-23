import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


export const Button = styled.button`
  padding: 12px 16px;
  font-size: ${_size.m};
  cursor: pointer;
  -webkit-appearance: none;
  outline: none !important;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  border-color: transparent;
  
  background: ${_color.blue};
  color: white;
    
  &:hover {
    background: ${_color.darkBlue};
  }
 
  ${(p) => p.secondary && css`
    background: white;
    color: ${_color.darkGray};
    border: 1px solid ${_color.blue};
    
    &:hover {
      background: ${_color.blue};
      color: white;
    }
  `}
  
  ${(p) => p.uppercase && css`
    text-transform: uppercase;
  `}
  
  ${(p) => p.fluid && css`
    width: 100%;
    justify-content: center;
    margin: 16px auto;
  `}
  
  svg {
    width: ${_size.m};
    height: ${_size.m};
    margin-right: ${_size.m};
    fill: ${_color.darkGray};
  }
`;

Button.propTypes = {
  fluid: PropTypes.bool,
  secondary: PropTypes.bool,
  uppercase: PropTypes.bool,
};

Button.defaultProps = {
  fluid: false,
  secondary: false,
  uppercase: false,
};
