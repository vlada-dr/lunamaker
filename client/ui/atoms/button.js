import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';


export const Button = styled.button`
  padding: 12px 16px;
  font-size: ${size.m};
  cursor: pointer;
  -webkit-appearance: none;
  outline: none !important;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  border-color: transparent;
  
  background: ${color.blue};
  color: white;
    
  &:hover {
    background: ${color.darkBlue};
  }
 
  ${p => p.secondary && css`
    background: white;
    color: ${color.darkGray};
    border: 1px solid ${color.blue};
    
    &:hover {
      background: ${color.blue};
      color: white;
    }
  `}
  
  ${p => p.uppercase && css`
    text-transform: uppercase;
  `}
  
  ${p => p.fluid && css`
    width: 100%;
    justify-content: center;
    margin: 16px auto;
  `}
  
  svg {
    width: ${size.m};
    height: ${size.m};
    margin-right: ${size.m};
    fill: ${color.darkGray};
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
