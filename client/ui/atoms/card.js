import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { Image } from './'


export const Card = ({ photo, name, children }) => (
  <Fade bottom >
    <CardWrapper >
      <Header>
      <Img size='20vh' src={photo} />
      </Header>
      <Body>
      <Title>{name}</Title>
      {children}
      </Body>
    </CardWrapper>
  </Fade>
)

const Img = Image.extend`
  display: block;
  position: relative;
  width: 140px;
  height: 140px;
  max-width: 100%;
  margin: 16px auto;
  z-index: 4;
`

const Title = styled.div`
  font-size: 1.3em;
  letter-spacing: .05em;
`

const CardWrapper = styled.div`
  margin: 16px;
  text-align: center;
  position: relative;
  width: 300px;
  height: 320px;
  display: flex;
  flex-direction: column;
  font-size: .9em;
  line-height: 1.5em;
  border-radius: 16px;
  background: rgba(255, 255, 255, 1);
    overflow: hidden;
`

const Header = styled.div` 
   position: relative;
padding: 8px;
`

const Body = styled.div`
 padding: 0 16px 16px;
 `;
