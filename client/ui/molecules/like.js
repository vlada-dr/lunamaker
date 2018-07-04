import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { Icon } from '../atoms'


const opacity = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
` 

const LikeWrapper = styled.div`
      ${p => p.liked && css`
   animation: ${opacity} 1s both;
    `}
`

export const Like = props => <LikeWrapper liked={props.liked}>
    <Icon name='HeartOutline' color={props.liked ? '#7496DB' : '#DBDBE3'} onClick={props.onClick} />
    </LikeWrapper>


Like.propTypes = {
    liked: PropTypes.bool,
    onClick: PropTypes.func
}

Like.defaultProps = {
    liked: false
}