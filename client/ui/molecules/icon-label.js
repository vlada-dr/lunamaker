import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '../atoms'
import React from 'react'

const def = <defs>
    <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="10%" stopColor="#1C1C59" />
        <stop offset="100%" stopColor="#03A9F4" />
    </linearGradient>
</defs>;

const Wrapper = (height, unit, propHeight, position) => `
  position: absolute;
  top: ${((propHeight - height) / 2) + unit};
  ${position}: ${((propHeight - height) / 2) + unit};
`

export const IconLabel = ({ height, propHeight, unit, position, ...props }) =>
 <Icon {...props}
            defs={def}
            size={`${height}${unit}`}
            css={Wrapper(height, unit, propHeight, position)}
    />
   

IconLabel.propTypes = {
    height: PropTypes.number,
    propHeight: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    color: PropTypes.string
}

IconLabel.defaultProps = {
    height: 1,
    propHeight: 2,
    position: 'left',
    color: 'url(#icon)'
}


