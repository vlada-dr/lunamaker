import * as React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MoonIcon } from 'ui/icons';


const Wrapper = styled(Link)`
  display: inline-flex;
  margin: ${_size.l} 0;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const Title = styled.div`
  font-family: ${_font.lato};
  color: ${_color.darkGray};
  letter-spacing: 2px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  
  svg {
    width: 14px;
    height: 14px;
    fill: ${_color.yellow};
    margin: 0 2px 4px;
  } 
`;

const Text = styled.div`
  font-family: ${_font.lato};
  color: ${_color.darkGray};
  letter-spacing: 0.52px;
  font-size: 12px;
  padding-top: 4px;
  font-weight: 600;
`;

export const Logo = () => (
  <Wrapper to='/'>
    <Title>
      <span>lunamak</span>
      <MoonIcon />
      <span>r</span>
    </Title>
    <Text>
      unique handmade every day
    </Text>
  </Wrapper>
);
