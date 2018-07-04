import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Icon } from '../atoms'

const Delete = styled.span`
    position: relative;
    right: -0.5rem;
    width:0.5rem;
    height: 0.5rem;
`

const TagWrapper = styled.div`
    font-family: 'Lobster';
    font-size: 1rem;
    margin: 0 1vw;
    display: inline-flex;
    align-items: center;
    margin: 0.3vh 1vh;
    border-radius: 2vh;
    padding: 0.25rem 0rem 0.25rem 0.4rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all .7s ease;
    ${(p) => p.check && css`
        border: 1px solid #ECE4F4;
        background: rgba(255, 255, 255, 0.5);
        &:hover {
            padding: 0.25rem 1rem 0.25rem 0.4rem;
        }
    `}
`

export const Tag = props => <TagWrapper check={props.check} onClick={props.add} props={props} >
    #{props.name}
    <Delete>
        <Icon name='X' size='.5rem' onClick={props.delete} />
    </Delete>
</TagWrapper>;

Tag.propTypes = {
    add: PropTypes.func,
    check: PropTypes.bool,
    delete: PropTypes.func,
    name: PropTypes.string.isRequired
}

Tag.defaultProps = {
    check: false
}