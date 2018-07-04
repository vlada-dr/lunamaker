import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ProfileTemplate } from '../../../ui/templates'
import { Avatar, Tag } from '../../../ui/molecules'
import { Cloud, Icon, IconLink, Flex, Image, Picture } from '../../../ui/atoms'
import { Add } from './'


export const Cloudlet = (props) => <Content>
    <Title>{props.title} </Title>
    <PresentsWrapper>
        {props.isAdd && <Add />}
        {props.presents.map(e => <Image key={e.id} src={e.src} round size='10vh' />)}
    </PresentsWrapper>
    <Right><IconLink name='ChevronRight' size='5vh' color='#ffffff' to={props.to} /></Right>
</Content>

const Title = styled.span`
    font-family: 'Source Sans Pro', sans-serif;
    letter-spacing: 0.1rem;
    font-size: 1.3rem;
    color: #5A606F;
    font-weight: 500;
    padding: 0.8rem;
text-align: center;
`

const Right = styled.div`
position: absolute;
height: 100%;
width: 15%;
display: flex;
justify-content: center;
align-items: center;
right: 0;
 transition: all .7s ease;
&:hover {
    transform: scale(1.2);
}
`

const PresentsWrapper = styled.div`
height: 10vh;
 width: 100%;
overflow: hidden;
position:relative;
 & > * {
      margin-right: 1rem;
    }
`
const Content = styled.div`
display: flex;
flex-direction: column;

    height: 20%;
    width: 100%; 
    border-radius: 2vh;
    background: rgba(255,255,255,0.2);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
padding: 0 1rem;
`
Cloudlet.defaultProps = {
    isAdd: false
}