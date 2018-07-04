import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { color } from '../theme'


export const Button = styled.button`
    letter-spacing: 0.1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.4rem;
    padding: 0.56rem 2rem;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    -webkit-appearance: none;
    outline: none !important;
    position: relative;
    overflow: hidden;
    background: transparent;
    transition: all 0.2s;
    
    ${p => p.darkblue && css`
        color: white;
        background: linear-gradient(135deg, #1C1C59, #425598);
        height: 3.5rem;  
    `}
    ${p => p.shine && css`
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: -200%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-20deg);
            overflow: hidden;
            border-radius: 2vh;
        }
        &:hover {
            &::after {
                animation: shine 1.6s ease;
            }
        }
        @keyframes shine {
            100% {
                left: 200%
            }
        }
    `}
    ${p => p.light && css`
        color: white;
        border: 1px solid  white;
    `}
`

Button.propTypes = {
    darkblue: PropTypes.bool,
    light: PropTypes.bool,
    shine: PropTypes.bool
}

Button.defaultProps = {
    darkblue: false,
    light: false,
    shine: false
}