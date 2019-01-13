import React from 'react';
import styled, { css } from 'styled-components';
import DailyBackgroundImage from 'ui/images/daily-background.png';
import Balloons from 'ui/images/balloons.png';
import BlackBalloons from 'ui/images/black-balloons.png';
import NavyBalloons from 'ui/images/navy-balloons.png';
import { PresentsList } from 'features';
import { Layout, Category, Header } from 'ui/atoms';
import { withRouter } from 'react-router-dom';


export const HomePage = withRouter(() => (
  <div>
    <Header>
      Часто шукають
    </Header>
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
  width: 20vw;
  height: 20vw;
`;

const Categories = styled(Layout)`
  padding: ${size.m};
  
  ${media.pho`
    flex-wrap: wrap;
  `}
`;

const Title = styled.div`
  font-size: 28px;
  margin: 0 auto ${size.xl};
  line-height: ${size.l};
  font-weight: 500;
  text-align: center;
`;

export const DailyWrapper = styled.div`
  width: 80vw;
  height: 20vw;
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
  padding: 0 80px 80px;
  
  & > * {
    height: 50%;
  }
`;
