import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { color } from '../theme'

export const Textarea = styled.textarea`
  display: flex;
  flex: 1 0 0px;
  margin: 0;
  padding: 0.6rem 0.6rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4rem;
  color: ${color.text};
  border: 0;
  overflow: hidden;
  outline: none;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-appearance: none;
height:  ${p => p.height};
background: ${p => p.back};
  ${(p) => p.bordered && css`
    border: 1px solid #efefef;
    border-radius: 15px;
    padding: 0.6rem 1rem;
  `}
    &:focus {

    outline:none;
border:1px solid #2FBDEC;
    }
`

Textarea.propTypes = {
    bordered: PropTypes.bool,
    back: PropTypes.string,
    height: PropTypes.string
}

Textarea.defaultProps = {
    bordered: false,
    back: 'transparent',
    height: '12rem'
}