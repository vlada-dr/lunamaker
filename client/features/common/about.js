import React from 'react';
import styled, { css } from 'styled-components';
import DailyBackgroundImage from 'ui/images/daily-background.png';
import { Layout, Header } from 'ui/atoms';
import { withRouter } from 'react-router-dom';


export const AboutPage = withRouter(() => (
  <Wrapper background={DailyBackgroundImage}>
    <DailyItem flow='column'>
      <Title>
        Курсова робота
        <br/>
        з дисципліни <b>"Системи баз даних"</b>
        <br/>
        на тему
      </Title>
      <Header>
        Система пошуку подарунків
      </Header>
      <Author>
        Виконала
        <br/>
        студентка групи ІС-63, 3 курс, ФІОТ, АСОІУ
        <br/>
        Дорошенко Владислава Віталіївна
      </Author>
    </DailyItem>
  </Wrapper>
));

const Categories = styled(Layout)`
  padding: ${size.m};
  
  ${media.pho`
    flex-wrap: wrap;
  `}
`;

const Title = styled.div`
  font-family: Lato;
  font-size: 28px;
  margin: 0 auto ${size.xl};
  line-height: 32px;
  font-weight: 500;
  text-align: center;
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
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
`;

const Author = styled(Title)`

  font-size: 21px;
  line-height: 25px;
`;
