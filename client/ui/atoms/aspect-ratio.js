import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { Card } from './'


const Icon = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  background: white;
  border: 2px solid ${_color.darkGray};
  top: -${_size.s};
  left: -${_size.s};
`;

export const AspectRatio = styled.div`
  width: calc(${(p) => p.width} - 32px);
  position: relative;
  display: inline-block;
  
  ${Card} {
    margin: 16px;
  }
  
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

AspectRatio.defaultProps = {
  size: 300,
  unit: 'px',
};

