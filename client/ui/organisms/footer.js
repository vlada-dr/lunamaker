import React from 'react'
import styled, { css } from 'styled-components';
import { Button, Layout, Logo, Link } from '../atoms';
import { FacebookIcon, InstagramIcon } from '../icons';


export const Footer = () => (
  <Wrapper>
    <Layout flow='row' width='50vw' align='center'>
      <Logo />
    </Layout>
    <Layout flow='column' width='50%' gap={16}>
      <div>
        Write us
      </div>
      <Link>
        ashmooree1@gmail.com
      </Link>
    </Layout>
    <Layout flow='column' width='50%' gap={16}>
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
)

const Wrapper = styled.div`
  height: 140px;
  margin-top: 64px;
  display:flex;
  align-items: center;
  border-top: 1px solid #e6e6e6; 
  position: static;
  bottom: 0;
     
  & > * {
    padding-left: 64px;
    
    &:last-child {
      padding-right: 64px;
    }
  }
`;
