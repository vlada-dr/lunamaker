import React from 'react'
import styled, {css } from 'styled-components'
import PropTypes from 'prop-types'
import {Icon } from '../atoms'


const Image = styled.div`
 width: ${p => p.size};
 height: ${p => p.size};
border-radius: 50%;
overflow:hidden;
`

const Photo = styled.div`
 width: 100%;
 height: 100%;
background-size:cover;
      background-image:  url("${p => p.src}");
`

                            
export const Avatar = (props) => (
    <Image size={props.size}>
        {props.src ? <Photo src={props.src} /> : <Icon name='UserImage' size={props.size} />
            }
    </Image>
)


Avatar.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string
}

Avatar.defaultProps = {
    size: '5vh'
}