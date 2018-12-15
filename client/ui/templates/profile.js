import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Container } from '../atoms'
import { Menu } from '../organisms'

const RootContainer = styled.section`
    display: flex;
    min-height: 100vh;
    flex-flow: column nowrap;
    font-size: 1rem;
    padding-top: 8vh;
    justify-content: center;
    align-items: center;
    background-size: cover;
`

//< Header > { header }</Header>    <Footer />
export const ProfileTemplate = ({ children, header }) => (
    <RootContainer>
        <Menu />
        {children}
    </RootContainer>
)

ProfileTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
}

ProfileTemplate.defaultProps = {
    header: null,
}
