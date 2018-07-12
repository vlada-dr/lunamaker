import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { Image } from './'


export const Card = ({ photo, name, children }) => (
  <Fade bottom >
    <CardWrapper >
      <Img round size='20vh' src={photo} />
      <Content>
        <Title>{name}</Title>
        {children}
      </Content>
    </CardWrapper>
  </Fade>
)

const Img = Image.extend`
position: absolute;
left:0;
`

const Title = styled.div`
    position:absolute;
    font-size: 2em;
    top:-2vh;
    left:15vh;
    width:70%;
    text-align:center;
`


const Content = styled.div`
    width: 100%;
    border-radius: 0 3vh 3vh 0;
    height: 100%;
    padding: 4vh 2vh 0 13vh;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.3);
`

const CardWrapper = styled.div`
    height: 20vh;
    position: relative;
    padding-left: 10vh;
    @media (orientation: landscape) {
    width: 40vw;
    margin: 2vh 2vw;
    }
    @media (max-width: 800px) {
    width: 90vw;
    margin: 2vh 5vw;
    }
    @media (orientation: portrait) {
    width: 90vw;
    margin: 2vh 5vw;
    }
`
