import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { MaleAvatar, FemaleAvatar } from 'ui/icons'


const Image = styled.div`
 width: ${(p) => p.size};
 height: ${(p) => p.size};
border-radius: 50%;
overflow:hidden;
`

const Photo = styled.div`
 width: 100%;
 height: 100%;
background-size:cover;
      background-image:  url("${(p) => p.src}");
`

const GenderPic = ({ gender, size }) => gender === 0
  ? <MaleAvatar width={size} height={size} />
  : <FemaleAvatar width={size} height={size} />

export const Avatar = ({ size, src, gender }) => (
  <Image size={size}>
    {src ? <Photo src={src} /> : <GenderPic gender={gender} size={size} /> }
  </Image>
)

GenderPic.propTypes = {
  gender: PropTypes.number,
  size: PropTypes.string,
}
GenderPic.defaultProps = {
  gender: 0,
  size: '5vh',
}

Avatar.propTypes = {
  gender: PropTypes.number,
  size: PropTypes.string,
  src: PropTypes.string,
}

Avatar.defaultProps = {
  gender: 0,
  size: '5vh',
  src: null,
}
