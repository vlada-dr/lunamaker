import React from 'react'
import styled, { keyframes } from 'styled-components'


export const Spinner = () => (<SpinWrapper>
  <svg className="spinner" viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill='none' strokeWidth="5" />
  </svg>
                              </SpinWrapper>)


const rotate = keyframes`
 100% {
    transform: rotate(360deg);
  }
`
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`
const SpinWrapper = styled.div`
    width:5vh;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner{
        width:100%;
        height:100%;
        animation: ${rotate} 2s linear infinite;
    }
    & .path {
        stroke: hsl(228, 40%, 40%);
        stroke-linecap: round;
        animation: ${dash} 1.5s ease-in-out infinite;
    }
`
