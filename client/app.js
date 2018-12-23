import * as React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { rootRoutes } from 'routes';
import { LOAD_USER } from 'types';
import { auth } from 'api';
import Notification from 'ui/notification';
import { Menu, Footer } from 'ui/organisms';
import { compose, withHandlers, lifecycle } from 'recompose'

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  user: state.common.user,
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch({ type: LOAD_USER, payload: auth.current() }),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
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
  position:relative;
`;

const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width:100%;
  min-height: 100vh;
`;
