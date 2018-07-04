
import * as React from 'react';
import Slider from 'rc-slider';
import {Error, Input} from '../atoms'
import styled, { css } from 'styled-components'
import { color, font } from '../theme'
import PropTypes from 'prop-types'
const Range = Slider.Range;


const fieldHeight = '3.6rem'

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: flex-startAge;
position: relative;
height: 5rem;
`
const RangeWrapper = styled.div`
    width: 55%;
    height:3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ErrorWrapper = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
`

const FieldContainer = styled.div`
    width: 20%;
    height: 3.6rem;
    font-family: ${font.formElement};
    color: ${color.text};
    -webkit-appearance: none;
    flex-shrink: 0;
    position:relative;
    top: 0;
    display: flex;
`


const Field = ({ error, onChange, onBlur, value, label, type, required, maxLength, name }) => (
  <FieldContainer >
      <Input
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          required={required}
          aria-describedby={label}
          aria-label={label}
          aria-required={required}
          maxLength={maxLength}
          autoCapitalize="false"
          autoCorrect="false"
          rounded
          back={color.backgroundWhite}
        />
    </FieldContainer>
)

const MySlider = ({ startAge, endAge, onChange }) => (<Wrapper>
        <Field
            name='startAge'
            value={startAge} />
        <RangeWrapper>
            <Range
                value={[startAge, endAge]}
                onChange={onChange}
                allowCross={false} />
        </RangeWrapper>
        <Field
            name='endAge'
            value={endAge} />
    </Wrapper>)

export default MySlider

MySlider.defaultProps = {
  startAge: 0,
  endAge: 100,
}

// export default class MySlider extends React.Component {
//    state = {
//        startAge: this.props.start,
//        endAge: this.props.end,
//        error: null
//    }

//    onChange = (field, value) => {

//        const newAge = /[^[0-9]/.test(value) ? this.state[field] : Number(value);

//        const error = (this.state.startAge > this.state.endAge) ?
//            '���������� �� �� ���� ������ �� �������' : '';
//        this.setState({ [field]: newAge, error: error });

//    };

//    rangeChange = (value) => {
//        this.setState({ startAge: value[0], endAge: value[1] });
//        this.props.onChange("startAge", value[0]);
//        this.props.onChange("endAge", value[1]);
//    }

//    render() {
//        const { startAge, endAge } = this.props;
//        const { error } = this.state;
//        return <Wrapper><Field
//            name='startAge'
//            value={startAge}
//            onChange={this.onChange} />
//            <RangeWrapper>
//                <Range
//                    value={[startAge, endAge]}
//                    onChange={this.rangeChange}
//                    allowCross={false} />
//            </RangeWrapper>
//            <Field
//                name='endAge'
//                value={endAge}
//                onChange={this.onChange} />
//            <ErrorWrapper>
//                <Error
//                    error={this.state.error}
//                    active={(error && (error.length > 0)) ? true : false} />
//            </ErrorWrapper>
//        </Wrapper>;
//    }
// }
