import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, lifecycle } from 'recompose';
import Suggest from 'ui/images/suggest-fluid.png';
import { connect } from 'react-redux';
import { getTags } from 'features/tag/actions';
import { PresentForm } from '../organisms';
import { add } from '../actions';
import { Row } from './page';


const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(getTags()),
  createPresent: present => dispatch(add(present)),
});

const mapStateToProps = ({ tag }) => ({
  tags: tag.tags,
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getTags();
    },
  }),
);

const Image = styled(Row)`
  height: 50vh;
  width: 100vw;
  justify-content: flex-end;
  background: #e6e6e2;
  
  img {
    height: 100%;
    width: auto;
  }
  
  ${media.pho`
    width: 100vw;
    height: 100vw;
    object-fit: cover;
  `}
`;

const Header = styled.div`
  padding: 64px 128px;
  position: absolute;
  left: 0;
  top: 0;
  width: 50vw;
  margin: 80px auto;
  
  ${media.pho`
    position: relative;
    width: 100vw;
    padding: 0 ${size.m};
    margin: auto;
  `}
`;

const CreatePresentView = ({ createPresent, tags }) => (
  <>
    <Image>
      <img src={Suggest} />
    </Image>
    <Header>
      <h1>
        Запропонуйте свiй подарунок
      </h1>
      <div>
        Будь ласка, перевірте каталог, перш ніж додавати пропозицію для подарунку.
        Заповніть форму нижче та дочекайтеся, поки вона пройде перевiрку модеротора
      </div>
    </Header>
    <PresentForm
      tags={tags}
      propsSubmit={createPresent}
    />
  </>
);

CreatePresentView.propTypes = {
  createPresent: PropTypes.func,
};

CreatePresentView.defaultProps = {
  createPresent: null,
};

export const NewPresent = enhance(CreatePresentView);
