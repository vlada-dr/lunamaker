import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, Filter } from '../organisms'

import { Container } from '../atoms'


const RootContainer = styled.section`
  display: flex;
  min-height: 100vh;
  flex-flow: column nowrap;
  font-size: 1rem;
  padding-top: 12rem;
`

const PageContainer = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`
    //< Header > { header }</Header>    <Footer />
export const CommonTemplate = ({ children, header }) => (
    <RootContainer>

        <PageContainer>
            <Container>
                {children}
            </Container>
        </PageContainer>

    </RootContainer>
)

CommonTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node,
}

CommonTemplate.defaultProps = {
    header: null,
}
