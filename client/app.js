import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { rootRoutes } from 'routes';
import { LOAD_USER } from 'types';
import { auth } from 'api';
import Notification from 'ui/notification';
import { Menu, Footer } from 'ui/organisms';
import { compose, lifecycle } from 'recompose';


const enhance = compose(
  connect(state => ({
    appLoaded: state.common.appLoaded,
    user: state.common.user,
    state,
  }), dispatch => ({
    onLoad: () => dispatch({ type: LOAD_USER, payload: auth.current() }),
  })),
  lifecycle({
    componentDidMount() {
      this.props.onLoad();
    },
  }),
);

const Layout = () => (
  <Wrapper>
    <Notification />
    <Menu />
    <Content>
      {rootRoutes()}
    </Content>
    <Footer />
  </Wrapper>
);

export const App = enhance(Layout);

const Content = styled.div`
  z-index: 3;
  position: relative;
  padding-top: 78px;
  width: 100vw;
  overflow: hidden;
  
  ${media.pho`
    padding: 96px 0;
  `}
`;

const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width:100%;
  min-height: 100vh;
`;
