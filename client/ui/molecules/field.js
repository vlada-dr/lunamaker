import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Input, Error, Textarea } from '../atoms'
import { IconLabel } from './'
import { color, font, variables } from '../theme'


const fieldHeight = variables.fieldHeight + variables.fieldUnit
const propHeight = variables.fieldHeight
const iconHeight = 2.4

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: ${variables.fieldHeight + variables.fieldUnit};
    font-family: ${font.formElement};
    color: ${color.text};
    -webkit-appearance: none;
    flex-shrink: 0;
    align-items: center;
    ${(p) => p.area && css`
    height: 10rem;
    `}
    ${(p) => p.active && css`
        ${FieldLabel} {
            transform: scale(0.83333) translateY(-1rem);
        }
        ${Input} {
            padding-top: 1.8rem;
            padding-bottom: 0.2rem;
        }
        ${Textarea} {
            padding-top: 1.8rem;
            padding-bottom: 0.2rem;
        }`
}

`
const FieldLabel = styled.label`
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  transition: transform ease-out .1s;
  transform-origin: left;
  text-overflow: ellipsis;
  right: 0;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
  line-height: ${variables.inputHeight + variables.inputUnit};
  left: 1rem;
  height: ${variables.inputHeight + variables.inputUnit};
  color: ${color.textLight};
`
const FieldWrapper = styled.div`
  height: ${variables.inputHeight + variables.inputUnit};
  ${(p) => p.area && css`
height: 8.6rem;
`}
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 0 solid black;
  top: 0;
${(p) => p.calendar && css`
  background: rgba(255,255,255,0.8);
  border-radius: 15px;
`}
`

export const Field = ({ error, onChange, onBlur, value, label, type, required, maxLength, name, calendar }) => (
  <FieldContainer active={value && value.trim().length !== 0} >
      <FieldWrapper>
          <FieldLabel>{label}</FieldLabel>
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
              maxLength ={maxLength}
              autoCapitalize= "false"
              autoCorrect= "false"
              rounded
              back= {color.backgroundWhite}
            />
        </FieldWrapper>
      <Error error={error} active={!!((error && (error.length > 0)))} />
      {IconValid(error)}
    </FieldContainer>
)

export const Calendar = ({ error, onChange, onBlur, value, label, name }) => (
  <FieldContainer active>
      <FieldWrapper calendar>
          <FieldLabel>{label}</FieldLabel>
          <DayPickerInput
value={value}
              name={name}
              onDayChange={(e) => onChange(name, e)}
            />
        </FieldWrapper>
      <Error error={error} active={!!((error && (error.length > 0)))} />
      {IconValid(error)}
    </FieldContainer>
)


const IconValid = (error) => error != null && <IconLabel
  name={error.length == 0 ? 'Check' : 'X'}
  propHeight={variables.inputHeight}
  unit={variables.fieldUnit}
  height={iconHeight / 2.5}
  position='right'
  color={error.length == 0 ? color.success : color.danger}
/>;

export const FieldArea = ({ error, onChange, onBlur, value, label, type, required, maxLength, name }) => (
  <FieldContainer active={value && value.trim().length !== 0} area>
      <FieldWrapper area >
                      <FieldLabel>{label}</FieldLabel>
                      <Textarea
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
                          back={color.backgroundWhite}
                          height='12rem'
                        />
                    </FieldWrapper>
      <Error error={error} active={!!((error && (error.length > 0)))} />
      {IconValid(error)}
    </FieldContainer>
)

FieldContainer.propTypes = {
  active: PropTypes.bool,
  area: PropTypes.bool,
}
FieldContainer.defaultProps = {
  active: false,
  area: false,
}

Field.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  required: false,
  maxLength: 100,
  name: undefined,
  error: null,
  login: false,
  register: false,
}

Field.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}
