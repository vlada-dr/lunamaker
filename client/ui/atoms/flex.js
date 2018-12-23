import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


export const Flex = styled.div`
  display: flex;
  ${(p) => p.column && css`
        flex-direction: column${p.reverse ? '-reverse' : ''};
    `}
     
    flex-direction: ${(p) => `${p.direction}${p.reverse ? '-reverse' : ''}`};
    
 ${(p) => p.width && css`
        width: ${(p) => p.width};
    `}
 ${(p) => p.height && css`
        height:  ${(p) => p.height};
    `}
 ${(p) => p.p && css`
        padding:  ${(p) => p.p};
    `}
 ${(p) => p.m && css`
        margin:  ${(p) => p.m};
    `}
    
 & > *  {
     ${(p) => p.child && css`
         margin: ${(p) => p.child};
     `}
 }
 ${(p) => p.wrap ? css`
    flex-wrap: wrap;
 ` : null}
 ${(p) => p.justify && css`
    justify-content: ${p.justify}
 `};
 ${(p) => p.align && css`
    align-items: ${p.align}
 `};
 
 
`


Flex.propTypes = {
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'baseline']),
  child: PropTypes.string,
  column: PropTypes.bool,
  height: PropTypes.string,
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  m: PropTypes.string,
  p: PropTypes.string,
  width: PropTypes.string,
  wrap: PropTypes.bool,
}

Flex.defaultProps = {
  child: '0',
  height: 'auto',
  m: '0',
  p: '0',
  width: 'auto',
  align: 'center',
  column: false,
  justify: 'flex-start',
  wrap: false,
  reverse: false,
  direction: 'row',
}
