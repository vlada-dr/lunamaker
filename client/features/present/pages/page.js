import React from 'react'
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose';
import { Flex, NavLink, Card, Button, Layout } from 'ui/atoms'
import { withRouter, Link } from 'react-router-dom';
import { color } from '../../../ui/theme'
import { Like } from '../../../ui/molecules'
import { ProfileTemplate } from '../../../ui/templates'
import { DailyWrapper } from '../../../ui/pages/home';
import { presentById, storeById } from '../actions'
import { Authenticated } from '../../auth';
import { chunk } from './list'


const mapStateToProps = (state, ownProps) => ({
  present: state.present.presentById,
  historyId: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (id) => dispatch(presentById(id)),
});

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-top: 78px;
  
   ${media.pho`
    flex-wrap: wrap;
  `}
  
  & > * {
    display: flex;
    flex-direction: column;
    width: 50%;
    
    ${media.pho`
      width: 100%;
    `}
  }
`;

export const MainImage = styled.img`
  width: 50vw;
  height: 50vw;
  object-fit: cover;
`;

export const Column = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 48px 0 0 32px;
`;

const Img = styled.div`
  width: calc(50% - 24px);
  display: block; 
  position: relative;
  margin-bottom: 48px;
  
  &:nth-child(2n) {
    padding-left: 48px;
    
    img {
      top: 96px;
    }
  }
    
  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  padding: 0 64px;
  align-items: baseline;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: ${_size.m};
  right: ${_size.m};
`;

class PresentPageView extends React.Component {
    state = { liked: false }

    componentDidMount() {
      this.props.onLoad(this.props.historyId);
    }

    onLike = () => this.setState((prevState) => ({ liked: !prevState.liked }))

    onRemovePresent = () => true;

    render() {
      const { present, history, location } = this.props;

      if (!present) {
        return null;
      }

      const { images } = present;

      return (
        <Row>
          <div>
            <MainImage src={images[0]} />
            <Column>
              {images.map((i) => <Img><img key={i} src={i} /></Img>)}
            </Column>
          </div>
          <Content>
            <NavLink to='/'>
              Back to Accessories
            </NavLink>
            <h1>
              {present.title}
            </h1>
            <Layout flow='row' gap={16}>
              <Button secondary>
                {present.price} грн
              </Button>
              <Authenticated>
                <Link to={`${location.pathname}/edit`}>
                  <Button>
                  Редагувати
                  </Button>
                </Link>
              </Authenticated>
            </Layout>
            <div>
              {present.body.split('\n').map((d) => <p>{d}</p>)}
            </div>
            <h3>
              Коментарi
            </h3>
          </Content>
        </Row>
      )
    }
}


export const PresentPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PresentPageView);
