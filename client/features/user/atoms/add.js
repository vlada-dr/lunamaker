import * as React from 'react';
import styled from 'styled-components'
import { IconLink } from '../../../ui/atoms'

const Scale = `
  transition: all .5s ease;
    &:hover {
        transform: scale(1.1);
    }
`

export const Add = ()=><PlusWrapper>
    <IconLink css={Scale} to="/presents/new" name='Plus' color='white' size='4vh' />
</PlusWrapper>;


const PlusWrapper = styled.div`
    background: #E5E6FF;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 10vh;
    height: 10vh;
    position: absolute;
    top: 0;
`

