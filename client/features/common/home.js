import React from 'react';
import styled, { css } from 'styled-components';
import DailyBackgroundImage from 'ui/images/daily-background.png';
import Balloons from 'ui/images/balloons.png';
import BlackBalloons from 'ui/images/black-balloons.png';
import NavyBalloons from 'ui/images/navy-balloons.png';
import { PresentsList } from 'features';
import { ArrowLink, Layout, Category } from 'ui/atoms';
import { withRouter } from 'react-router-dom';


export const HomePage = withRouter(() => (
  <div>
    <Image src='https://beridari.ua/image/cache/data/products/China/vino/_MG_0065-600x600.jpg' />
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
    <Categories>
      <Category
        name='На день всіх закоханих'
        link='/'
        image={Balloons}
      /><Category
        name='Для сестри'
        link='/'
        image={BlackBalloons}
      /><Category
        name='На день народження'
        link='/'
        image={NavyBalloons}
      />
    </Categories>
    <PresentsList />
  </div>
));

const Image = styled.img`
  width: 30vw;
  height: 30vw;
`;

const Categories = styled(Layout)`
  padding: ${size.m};
  
  ${media.pho`
    flex-wrap: wrap;
  `}
`;

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
  width: 70vw;
  height: 30vw;
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
