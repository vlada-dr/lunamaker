import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Input, Error } from '../atoms'
import { color, font, variables } from '../theme'
import { IconLabel } from './icon-label'


const height = 2.4
const left = 1.5
const right = 2.5

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  @media (orientation: portrait) {
    width: 80vw;
  }
  width: 40vw;
  height: 5rem;
  font-family: ${font.formElement};
  color: ${color.text};
  -webkit-appearance: none;
  border-radius: 3px;
  flex-shrink: 0;
  align-items: center;
  border-radius: 2px;
  ${Input} {
    padding-left: ${variables.inputHeight + variables.inputUnit};
    height: 100%;
    width: 100%;
  }
`

const FieldWrapper = styled.div`
  height: ${variables.inputHeight + variables.inputUnit};
  position: relative;
  width: 100%;
`

export const LoginField = ({ error, label, name, icon, children, ...rest }) => (
  <FieldContainer>
    <FieldWrapper>
      <IconLabel
        name={icon}
        propHeight={variables.inputHeight}
        height={height / left}
        unit={variables.inputUnit}
        position='left'
      />
      <Input
        {...rest}
        type={name.includes('pass') ? 'password' : 'text'}
        name={name}
        aria-describedby={label}
        aria-label={label}
        autoCapitalize="false"
        autoCorrect="false"
        bordered
        placeholder={label}
        back={color.backgroundWhite}
      />
    </FieldWrapper>
    <Error error={error} active={!!(error && (error.length > 0))} />
    {children}
  </FieldContainer>
)

export const RegisterField = ({ error, ...props }) => {
  const isValid = error !== null ? (
    <IconLabel
      name={error.length === 0 ? 'Check' : 'X'}
      propHeight={variables.inputHeight}
      unit={variables.fieldUnit}
      height={height / right}
      position='right'
      color={error.length === 0 ? color.success : color.danger}
    />
  ) : null

  return (
    <LoginField {...props} error={error}>
      {isValid}
    </LoginField>
  )
}

RegisterField.propTypes = { error: PropTypes.string }

RegisterField.defaultProps = { error: null }

LoginField.propTypes = {
  children: PropTypes.node,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  icon: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
}

LoginField.defaultProps = {
  children: null,
  error: null,
  icon: null,
  label: null,
}
