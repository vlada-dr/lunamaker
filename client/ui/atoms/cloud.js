import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Icon } from './'


const Fade = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`

export const CloudWrapper = styled.div`
    height: 85vh;
    animation: ${Fade} 1s both;
    @media (orientation: portrait) {
        width: 90%;
    }
    @media (orientation: landscape) {
        width: 60%;
    }
    @media (min-width: 1200px) {
        width: 30%;
    }
    background: rgba(255,255,255,0.2);
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2rem 2rem 2rem;
`

const Back = styled.div`
    position:absolute;
    top:2rem;
    left:2rem;
    z-index: 2;
`
const Right = styled.div`
    position:absolute;
    top:2rem;
    right:2rem;
    z-index: 2;
`

const CloudView = ({ children, rightIcon, leftIcon }) => (
  <CloudWrapper>
    <Back>
      {leftIcon || <Icon name='Back' color='#888898' />}
    </Back>
    <Right>
      {rightIcon}
    </Right>
    {children}
  </CloudWrapper>
)

export const Cloud = withRouter(CloudView)

CloudView.propTypes = {
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
}

CloudView.defaultProps = {
  leftIcon: null,
  rightIcon: null,
}
