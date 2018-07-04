import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { color, font } from '../theme'

import { Icon, Cloud } from '../atoms'


const Title = styled.div`
    position:relative;
    font-size: 1.5rem;
    padding: 2rem 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    text-align: center;
    color: #888898;
`
@withRouter
export class Form extends React.Component {
    back = () => this.props.history.goBack();

    render() {
        const { children, header, submit } = this.props;
        return <Cloud>
            <Title> 
                {header}
            </Title>
            {children}
            <Icon css={Check} name='Check' color='#1F215F' onClick={submit} />
        </Cloud>;
    }
}

const Check = `
    margin: 0 auto;
    transition: all .7s ease;
    &:hover {
        transform: scale(1.2);
    }
`

Form.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
}

Form.defaultProps = {
    header: 'Редагувати',
}