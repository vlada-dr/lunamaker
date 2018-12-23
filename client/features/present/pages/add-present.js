import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { compose, withHandlers, lifecycle } from 'recompose'
import Suggest from 'ui/images/suggest.png';
import { connect } from 'react-redux'
import { getTags } from 'features/tag/actions'
import { PresentForm } from '../organisms'
import { add } from '../actions';
import { Column, Row, MainImage } from './page';


const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  createPresent: (present) => dispatch(add(present)),
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
  // withFirebase,
  // withHandlers({
  //  createPresent: ({ firebase }) => (present) => firebase.push('presents', present),
  // }),
);

const Col = styled(Column)`
padding: 0 32px;

  &:last-of-type {
  
  padding: 0;}
`;


const CreatePresentView = ({ createPresent, tags }) => (
  <Row>
    <Col>
      <PresentForm tags={tags} propsSubmit={createPresent} />
    </Col>
    <Col>
      <MainImage src={Suggest} />
    </Col>
  </Row>
);

CreatePresentView.propTypes = {
  createPresent: PropTypes.func,
};

CreatePresentView.defaultProps = {
  createPresent: null,
};

export const NewPresent = enhance(CreatePresentView);

