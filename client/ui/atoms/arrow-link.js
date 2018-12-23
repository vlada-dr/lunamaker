import * as React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRightIcon } from 'ui/icons';

const Wrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: 42px;
  height: 42px;
  padding: 12px;
  border: 1px solid ${_color.blue};
  
  svg {
    fill: ${_color.darkGray};
    width: 100%;
    height: 100%;
  }
`;

export const ArrowLink = ({ to }) => (
  <Wrapper to={to}>
    <ArrowRightIcon />
  </Wrapper>
);
