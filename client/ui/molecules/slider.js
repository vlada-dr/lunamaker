import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

/* eslint-disable no-magic-numbers */
const enhance = withHandlers({
  updateLower: ({ end, max, onChange }) => ({ target: { value } }) => {
    const low = parseInt(value, 10)
    const upper = (low > end - 4) ? (low + 4) : end
    const lower = ((low > end - 4) && (upper === max)) ? (max - 4) : low

    onChange({ start: lower, end: upper })
  },
  updateUpper: ({ start, min, onChange }) => ({ target: { value } }) => {
    const up = parseInt(value, 10)
    const lower = (up < start + 4) ? (up - 4) : start
    const upper = ((up < lower + 4) && (lower === min)) ? 4 : up

    onChange({ start: lower, end: upper })
  },
})

const RangeWrapper = styled.div`
   position: relative;
   height: 50px;
   width: 100%;
   margin: 2rem auto;
   input[type=range] {
      position: absolute;
      &:nth-child(1) {
         &::-webkit-slider-thumb::before {
            background-color: red;
         }
      }
      &:nth-child(2) {
         background: none;
         &::-webkit-slider-thumb::before {
             background-color: grey;
         }
      }
   }
`

const Range = styled.input`
  box-sizing: border-box;
  appearance: none;
  width: 80%;
  margin: 0;
  padding: 0 2px;
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: linear-gradient(to right, ${(p => `grey ${p.start}%, orchid  ${p.start}%, orchid ${p.end}%, grey ${p.end}%`)}) no-repeat center;
  background-size: 100% 2px;
  pointer-events: none;
  left: 10%;
  &:active, &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    height: 2rem;
    width: 2rem;
    border-radius: 2rem;
    background-color: #fff;
    position: relative;
    margin: 5px 0;
    cursor: pointer;
    appearance: none;
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 13px;
    left: 100%;
    width: 2000px;
    height: 2px;
  }
`

const SliderView = ({ updateUpper, updateLower, min, max, start, end }) => (
  <RangeWrapper>
    <Range type="range" value={start} start={start} end={end} min={min} max={max} onChange={updateLower} />
    <Range type="range" value={end} min={min} max={max} onChange={updateUpper} />
  </RangeWrapper>
)

export const Slider = enhance(SliderView)

SliderView.propTypes = {
  updateUpper: PropTypes.func,
  updateLower: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
}

SliderView.defaultProps = {
  updateUpper: null,
  updateLower: null,
  max: 100,
  min: 0,
  start: 15,
  end: 60,
}
