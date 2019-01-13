import * as React from 'react';
import styled from 'styled-components';
import { Button } from './button';


const Wrapper = styled(Button)`
  margin: ${size.s};
`;

export const Tag = ({ children, ...props }) => (
  <Wrapper {...props}>
    #{children}
  </Wrapper>
);
