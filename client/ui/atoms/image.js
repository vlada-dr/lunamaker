import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


export const Img = styled.div`
  width: ${p => p.size};
  height: ${p => p.size};
  overflow:hidden;
  background-size:cover;
  display: inline-block;
  ${p => p.round && css`
    border-radius: 50%;
  `}
`
export const Image = Img.extend`
  background-image: url(${p => p.src});
`

const Inner = styled.div`
  width:100%;
  height:100%;
  background-image:  url(${p => p.src});
`

export const Picture = ({ size, round, src }) => (
  <Img
    size={size}
    round={round}
  >
    <Inner src={src} />
  </Img>
)


Picture.propTypes = {
  round: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string,
}

Picture.defaultProps = {
  round: false,
  size: '5vh',
  src: null,
}
