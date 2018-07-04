import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import img from '../../styles/404image.jpg'
import { Menu } from '../organisms'

const RootContainer = styled.section`
    display: flex;
    height: 100vh;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`

const Image = styled.div`
    height: 100vh;
width: 100vw;
position:absolute;
overflow:hidden;
img {
    width:100%;
height:100%;
}
`
const NotFound = () =>
    <RootContainer>
        <Menu />
        <Image><img src='http://www.bittbox.com/wp-content/uploads/2008/06/10-37-Intriguing-404-Error-Page-Designs.jpg' />
        </Image> <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </RootContainer>

export default NotFound;