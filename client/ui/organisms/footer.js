import React from 'react'
import styled, { css } from 'styled-components';
import { Button, Layout, Logo, Link } from '../atoms';
import { FacebookIcon, InstagramIcon } from '../icons';


export const Footer = () => (
  <Wrapper>
    <LogoWrapper flow='row' align='center'>
      <Logo />
    </LogoWrapper>
    <Layout flow='column' gap={16}>
      <div>
        Write us
      </div>
      <WriteUsLink>
        ashmooree1@gmail.com
      </WriteUsLink>
    </Layout>
    <Layout flow='column' gap={16}>
      <div>
        Follow us
      </div>
      <Layout flow='row' gap={16}>
        <Button secondary>
          <FacebookIcon />
          Facebook
        </Button>
        <Button secondary>
          <InstagramIcon />
          Instagram
        </Button>
      </Layout>
    </Layout>
  </Wrapper>
);

const WriteUsLink = styled(Link)`
  width: fit-content;
`;

const Wrapper = styled.div`
  height: 140px;
  margin-top: 64px;
  display:flex;
  align-items: center;
  border-top: 1px solid #e6e6e6; 
  position: static;
  bottom: 0;
  
  & > * {
    padding: 0 0 0 64px;
    width: 50%;
    
    &:last-child {
      padding: 0 64px;
    }
  }
  
    
  ${media.pho`
    flex-direction: column;
    height: auto;
    
    & > *:not(:first-child) {
      width: 100%;
      padding: ${size.m};
    }
  `}
`;

const LogoWrapper = styled(Layout)`
  ${media.pho`
    position: absolute;
    padding: 0;
    width: 100%;
    bottom: 198px;
    justify-content: center;
    border-top: 1px solid #e6e6e6;
  `}
`;
