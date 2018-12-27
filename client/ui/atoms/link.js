import * as React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRightIcon } from 'ui/icons';


const Wrapper = styled(BaseLink)`
  display: inline-flex;
  align-items: center;
  margin: ${size.l} 0;
  
  svg {
    width: 12px;
    height: 16px;
    fill: ${color.blue};
  }
`;

export const Link = styled.div`
  padding-bottom: 4px;
  border-bottom: 1px solid ${color.blue};
  color: #333;
  line-height: 16px;
  width: auto;
  cursor: pointer;
  
  &:hover {
    color: ${color.blue};
  }
`;

export const NavLink = ({ to, children }) => (
  <Wrapper to={to}>
    <ArrowRightIcon />
    <Link>
      {children}
    </Link>
  </Wrapper>
);
