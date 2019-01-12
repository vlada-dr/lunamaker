import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { Slider } from 'ui/molecules';
import { Button, Input, Textarea, Layout, Tag } from 'ui/atoms';
import { validate } from 'features/validations';
import { Present } from 'features/present';


const enhance = compose(
  withStateHandlers(
    ({ present }) => ({ errors: { }, present }),
    {
      updateField: ({ touched, present }) => (name, value) => ({
        present: { ...present, [name]: value },
        touched: { ...touched, [name]: true },
      }),
      setError: ({ errors }) => (name, value) => ({
        errors: { ...errors, [name]: validate(name, value) },
      }),
    },
  ),
  withHandlers({
    onChange: ({ errors, updateField, setError }) => ({ target: { name, value } }) => {
      updateField(name, value)
      if (errors[name]) setError(name, value);
    },
    onRangeChange: ({ updateField }) => ({ start, end }) => {
      updateField('startAge', start);
      updateField('endAge', end);
    },
    onPriceChange: ({ updateField }) => ({ target: { value } }) => {
      updateField('price', value.replace(/[^\d+]/, ''));
    },
    onAddTag: ({ present, updateField }) => tag => updateField('tagList', present.tagList.concat(tag)),
    onDeleteTag: ({ present, updateField }) => tag => {
      const newTags = present.tagList.filter(t => t !== tag);

      updateField('tagList', newTags)
    },
    valid: ({ setError }) => ({ target: { name, value } }) => setError(name, value),
    onSubmit: ({ present, errors, propsSubmit }) => e => {
      e.preventDefault();

      const withoutErrors = errors ? Object.values(errors).map(k => k.length === 0) : true;

      let tagList = present.tagList || [];

      if (present.tagInput) {
        tagList = [...tagList, ...present.tagInput.split(',')];
      }

      if (withoutErrors) {
        propsSubmit({
          present: {
            ...present,
            images: present.images ? present.images.split('\n') : [],
            tagList,
          },
        });
      }
    },
  }),
);

const FormView = ({
  onChange,
  onRangeChange,
  onAddTag,
  onDeleteTag,
  valid,
  onSubmit,
  errors,
  present,
  updateField,
  tags,
  onPriceChange,
}) => (
  <Wrapper>
    <FormPart flow='column' gap={24}>
      <h3>
          Основна iнформацiя
      </h3>
      <Layout flow='row' gap={16}>
        <Input
          name='title'
          value={present.title}
          onChange={onChange}
          onBlur={valid}
          error={errors.title}
          placeholder='Назва'
        />
        <Input
          name='price'
          value={present.price}
          onChange={onPriceChange}
          onBlur={valid}
          error={errors.price}
          placeholder='Цiна'
        />
      </Layout>
      <Input
        name='description'
        value={present.description}
        onChange={onChange}
        onBlur={valid}
        error={errors.description}
        placeholder={'Прев\'ю'}
      />
      <Textarea
        name='body'
        value={present.body}
        onChange={onChange}
        onBlur={valid}
        error={errors.body}
        placeholder='Опис'
      />
      <Layout flow='row' wrap>
        {
          present.images && present.images.split('\n').map(i => (
            <Image key={i} src={i} />
          ))
        }
      </Layout>
      <Textarea
        name='images'
        value={present.images}
        onChange={onChange}
        onBlur={valid}
        error={errors.images}
        placeholder='Фото'
      />
      <h3>
        Контакти
      </h3>
      <Textarea
        name='contacts'
        value={present.contacts}
        onChange={onChange}
        error={errors.contacts}
        placeholder='Контакти'
        style={{ width: '100%' }}
      />
    </FormPart>
    <FormPart flow='column' gap={24}>
      <h3>
          Теги
      </h3>
      <Slider
        start={present.startAge}
        end={present.endAge}
        onChange={onRangeChange}
      />
      <Input
        name='tagInput'
        value={present.tagInput}
        onChange={onChange}
        placeholder="Роздiлiть теги комами"
      />
      <div>
        {
          tags.map(t => (
            <Tag
              key={t}
              secondary={!present.tagList || !present.tagList.includes(t)}
              onClick={() => present.tagList.includes(t) ? onDeleteTag(t) : onAddTag(t)}
            >
              {t}
            </Tag>
          ))
        }
      </div>
    </FormPart>
    <SubminButton onClick={onSubmit} uppercase>
      Запропонувати
    </SubminButton>
  </Wrapper>
);

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 ${size.m} ${size.m} 0;
`;

const FormPart = styled(Layout)`
  width: 50%;
  display: inline-flex;
  padding: ${size.l};
  
  ${media.pho`
    width: 100%;
  `}
`;

const SubminButton = styled(Button)``;

const Wrapper = styled.div`
  padding: ${size.m};
  
  ${media.pho`
    margin: 0 -48px;
  `}
  
  ${SubminButton} {
    display: flex;
    
    ${media.pho`
      width: 100%;
    `}
  }
`;

FormView.propTypes = {
  onChange: PropTypes.func,
  onRangeChange: PropTypes.func,
  onAddTag: PropTypes.func,
  onDeleteTag: PropTypes.func,
  valid: PropTypes.func,
  onSubmit: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  present: Present,
  updateField: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string),
};

FormView.defaultProps = {
  onChange: null,
  onRangeChange: null,
  onAddTag: null,
  onDeleteTag: null,
  valid: null,
  onSubmit: null,
  errors: {},
  present: {
    tagList: [],
  },
  updateField: null,
  tags: [],
};

export const PresentForm = enhance(FormView);
