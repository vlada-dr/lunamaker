import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'; 

import { Input, Error } from '../atoms'
import { IconLabel } from './'
import { color, font, variables } from '../theme'


const fieldHeight = variables.inputHeight + variables.inputUnit;
const propHeight = variables.inputHeight;
const iconHeight = 2.4;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    @media (orientation: portrait) {
       width: 80vw;
    }
    @media (orientation: landscape) {
        width: 40vw;
    }
    height: 5rem;
    font-family: ${font.formElement};
    color: ${color.text};
    -webkit-appearance: none;
    border-radius: 3px;
    flex-shrink: 0;
    align-items: center;
    border-radius: 2px;
    ${Input} {
        padding-left: ${fieldHeight};
        height: 100%;
width: 100%;
    }
`

const FieldWrapper = styled.div`
    height: ${fieldHeight};
    position: relative;
    width: 100%;
`

export const LoginField = ({ register, error, onChange, onBlur, value, label, type, required, maxLength, name, icon }) => (
    <FieldContainer>
        <FieldWrapper>
            <IconLabel
                name={icon}
                propHeight={propHeight}
                height={iconHeight / 1.5}
                unit={variables.inputUnit}
                position='left' />
            <Input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={name}
                required={required}
                aria-describedby={label}
                aria-label={label}
                aria-required={required}
                maxLength={maxLength}
                autoCapitalize="false"
                autoCorrect="false"
                bordered
                placeholder={label}
                back={color.backgroundWhite}
            />
        </FieldWrapper>
        <Error error={error} active={(error && (error.length > 0))? true : false} />
        {register && IconValid(error)}
    </FieldContainer>
)



const IconValid = (error) => error !== null && <IconLabel
    name={error.length === 0 ? 'Check' : 'X'}
    propHeight={variables.inputHeight}
    unit={variables.fieldUnit}
    height={iconHeight / 2.5}
    position='right'
    color={error.length === 0 ? color.success : color.danger} />;


LoginField.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

LoginField.defaultProps = {
    value: '',
    label: '',
    type: 'text',
    required: false,
    maxLength: 30,
    name: undefined,
    icon: 'User',
    error: null
}

