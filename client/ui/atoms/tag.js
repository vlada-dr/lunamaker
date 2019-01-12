import * as React from 'react';
import styled from 'styled-components';
import { Button } from './button';


const Wrapper = styled(Button)`
  margin: ${size.s};
  
  &:first-child {
    margin-left: 0;
  }
`;

export const Tag = ({ children, ...props }) => (
  <Wrapper {...props}>
    #{children}
  </Wrapper>
);
