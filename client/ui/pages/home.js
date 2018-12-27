import React from 'react'
import styled, { css } from 'styled-components';
import DailyItemImage from 'ui/images/daily-item.png';
import DailyBackgroundImage from 'ui/images/daily-background.png';
import { PresentsList } from '../../features'
import { Header, ArrowLink, Layout } from '../atoms'


const HomeView = () => (
  <div>
    <DailyWrapper>
      <img src='https://beridari.ua/image/cache/data/products/China/vino/_MG_0065-600x600.jpg' />
    </DailyWrapper>
    <DailyWrapper background={DailyBackgroundImage}>
      <DailyItem flow='column' align='center'>
        <Layout flow='column'>
          <Date>
            19 December 2018
          </Date>
          <Title>
            Handmade daily item
          </Title>
        </Layout>
        <Line />
        <div>
          <ArrowLink to="" />
        </div>
      </DailyItem>
    </DailyWrapper>
    <PresentsList />
  </div>
)

export const Home = HomeView;

const Date = styled.div`
  font-family: ${font.playfair};
  font-size: 36px;
  color: ${color.darkGray}
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  margin: 32px auto ${size.xl};
  line-height: ${size.l};
  font-weight: 500;
`;

export const DailyWrapper = styled.div`
  width: 50vw;
  height: 50vw;
  display: inline-block;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  
  ${p => p.background && css`
    background: url('${p.background}');
  `}
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const DailyItem = styled(Layout)`
  position: absolute;
  top: ${size.xxl};
  bottom: ${size.xxl};
  left: ${size.xxl};
  right: ${size.xxl};
  background: white;
  border: 2px solid ${color.light};
  padding: 80px;
  
  & > * {
    height: 50%;
  }
`;

const Line = styled.div`
  width: ${size.xxl};
  height: 2px;
  background: ${color.yellow};
  top: 50%;
  bottom: 50%;
`;

const Text = styled.div`
  font-size: 16px;
  color: ${color.lightGray};
  width: 400px;
  margin: 16px auto;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.33px;
`;
