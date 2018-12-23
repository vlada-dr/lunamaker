import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { Image } from './'
import { Link } from 'react-router-dom';


export const CardWrapper = ({ photo, name, children, size, background }) => {
  const transformed = typeof size === 'number' ? `${size}px` : size;

  return (
    <Card
      background={photo || background}
      size={transformed}
    >
      <Icon />
    </Card>
  );
};

const Icon = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  background: white;
  border: 2px solid ${_color.darkGray};
  top: -${_size.s};
  left: -${_size.s};
`;

export const Card = styled(Link)`
  position: absolute;
  top: 0; 
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  cursor: pointer;
  display: block;
  transition: all .3s ease-in-out;
  background: url('${p => p.background ? p.background : p.photo}') no-repeat center center / cover;
  
  &:hover {
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  }
`;

Card.defaultProps = {
  size: 300,
  unit: 'px',
  to: ''
};

