import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Input, Error, Icon } from '../atoms'
import { color, font } from '../theme'



const FieldContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 0 20%;
   
`

export const Select = ({ name, values, value, onChange }) => (
    <FieldContainer>
        {values.map(e =>
            <Icon
                key={e.value}
                name={e.icon}
                style={{ opacity: value === e.value ? '1' : '0.5' }}
                onClick={() => onChange(name, e.value)}
            />
        )}
    </FieldContainer>
)


export const GenderDouble = ({ value, onChange }) =>
    <Select name='gender'
        values={[{ icon: 'Mars', value: 0 }, { icon: 'Venus', value: 1 }]}
        value={value}
        onChange={onChange}
    />

export const GenderTriple = ({ value, onChange }) =>
    <Select name='gender'
        values={[{ icon: 'Mars', value: 1 },
        { icon: 'BothGenders', value: 0 },
        { icon: 'Venus', value: 2 }]}
        value={value}
        onChange={onChange}
    />

Select.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
