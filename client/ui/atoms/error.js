import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade';

import { color} from '../theme'


const ErrorText = styled.span`
  display: inline-block;
    box-sizing: border-box;
 color: ${color.danger};
`

export const Error = ({ error, active }) => (
    <Fade bottom collapse when={active}>
        <ErrorText> {error} </ErrorText>
     </Fade>
)


Error.propTypes = {
    error: PropTypes.string,
    active: PropTypes.bool
}

Error.defaultProps = {
    error: '',
    active: false
}