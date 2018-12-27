import React from 'react';
import styled from 'styled-components';
import { Layout } from './layout';
import { ArrowLink } from './arrow-link';


const Wrapper = styled(Layout)`
  height: 250px;
  width: 450px;
  flex: 1 1 30%;
  position: relative;
  margin: ${size.m};
  padding: 0 ${size.m} ${size.m};
  border: 1px solid ${color.gray};   

  img {
    height: 100%;
    object-fit: cover;
    position:absolute;
    right: 0;
    top: 0;
  }
`;

export const Category = ({ name, link, image }) => (
  <Wrapper flow='column' justify='space-between'>
    <h3>{name}</h3>
    <ArrowLink to={link} />
    <img src={image} />
  </Wrapper>
);
