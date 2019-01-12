import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  NavLink, Button, Layout, Tag,
} from 'ui/atoms';
import { withRouter, Link } from 'react-router-dom';
import { presentById } from '../actions';
import { Authenticated } from '../../auth';


const mapStateToProps = (state, props) => ({
  present: state.present.presentById,
  id: props.match.params.id,
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(presentById(id)),
});

class PresentPageView extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onLoad: PropTypes.func,
    present: PropTypes.object,
  };

  static defaultProps = {
    present: null,
    onLoad: null,
  };

  state = {
    liked: false,
  };

  componentDidMount() {
    this.props.onLoad(this.props.id);
  }

  onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));

  onRemovePresent = () => true;

  render() {
    const { present, location } = this.props;

    if (!present) {
      return null;
    }

    const { images } = present;

    return (
      <Row>
        <DesktopGallery>
          <MainImage src={images[0]} />
          <Column>
            {images.map(i => (
              <Img key={i}>
                <img src={i} />
              </Img>
            ))}
          </Column>
        </DesktopGallery>
        <PhoneGallery>
          {images.map(i => (
            <img src={i} />
          ))}
        </PhoneGallery>
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
          <Layout flow='row' wrap>
            {present.tagList.map(t => <Tag key={t}>{t}</Tag>)}
          </Layout>
          <div>
            {present.body.split('\n').map(d => <p key={d}>{d}</p>)}
          </div>
          <h3>
            Коментарi
          </h3>
        </Content>
      </Row>
    );
  }
}


export const PresentPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PresentPageView);


export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  
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
  top: ${size.m};
  right: ${size.m};
`;

const DesktopGallery = styled.div`
  ${media.pho`
    display: none;
  `}
`;

const PhoneGallery = styled.div`
  display: none;

  ${media.pho`
    display: flex;
    width: 100%;
    height: 100vw;
    flex-direction: row;
    overflow-x: auto;
  `}
 
  img {
    width: 100vw;
    height: 100vw;
  }
`;
