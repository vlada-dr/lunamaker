import styled from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade';
import { color } from '../theme'

import React from 'react';
const Title = styled.span`
    display: inline-block;
    h2 {
        font-size: ${p => p.size};
    letter-spacing: 0.3em;
margin: 0;
    }
    text-transform: uppercase;
    color: #1C1C59;
    font-family: tk-brandon-grotesque-n4, sans-serif;
    text-align:center;
font-weight: 800;
`

export const Name = ({ size }) => <Title size={size}><h2>SurpriseU</h2></Title>

Name.propTypes = {
    size: PropTypes.string
};

Name.defaultTypes = {
    size: '5rem'
};