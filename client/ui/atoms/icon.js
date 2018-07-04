import styled, { css}from 'styled-components'
import PropTypes from 'prop-types'
import { Icons } from './icons'
import React from 'react'
import { NavLink } from 'react-router-dom';

const Wrapper = styled.span`
    display: flex;
align-items:center;
justify-content:center;
    width: ${p => p.size || p.width};
    height:  ${p => p.size || p.height};
    position: relative;
    & > svg {
    position: relative;
    width: 100%;
    height: 100%;
    fill: ${p => p.color};
    stroke: ${p => p.color};
  }
    ${p => p.css && css`
       ${ p.css }
    `}
`

export const Icon = ({ name, defs, ...props }) => <Wrapper {...props}>
    <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        viewBox={Icons[name].viewBox} >
        {defs}
        {Icons[name].content}
    </svg>
</Wrapper>

export const IconLink = ({ to, ...props }) => <NavLink to={to}>
    <Icon {...props} />
</NavLink>
IconLink.propTypes = {
    to: PropTypes.string.isRequired
}
Icon.propTypes = {
    color: PropTypes.string,
    css: PropTypes.string,
    defs: PropTypes.node,
    name: PropTypes.string.isRequired,
    size: PropTypes.string
}

Icon.defaultProps = {
    color: '#000000',
    css: undefined,
    defs: null,
    size: '3vh'
}

    //<defs>
    //    <linearGradient id="gradient2">
    //        <stop offset="10%" stopColor="#FCBC59" />
    //        <stop offset="55%" stopColor="#EE494C" />
    //        <stop offset="100%" stopColor="#8142C4" />
    //    </linearGradient>
    //    <linearGradient id="gradient3">
    //        <stop offset="10%" stopColor="#636E93" />
    //        <stop offset="100%" stopColor="#130CB7" />
    //    </linearGradient>
    //    <linearGradient id="gradient1">
    //        <stop offset="10%" stopColor="#0283BF" />
    //        <stop offset="100%" stopColor="#03A9F4" />
    //    </linearGradient>
    //    <linearGradient id="gradient4">
    //        <stop offset="10%" stopColor="#31274A" />
    //        <stop offset="100%" stopColor="#B8B9D7" />
    //        <stop offset="100%" stopColor="#615481" />
    //    </linearGradient>
    //    <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
    //        <stop offset="10%" stopColor="#1C1C59" />
    //        <stop offset="100%" stopColor="#03A9F4" />
    //    </linearGradient>
    //</defs>