import * as React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { REMOVE_NOTIFICATION } from 'types';

const Header = styled.div`
  padding-bottom: ${_size.s};
  text-transform: uppercase;
  color: ${p => p.color};
`;

const Message = styled.div`
  font-weight: 600;
  margin: ${_size.s} 0;
  font-size: 16px;
`;

const translate = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  font-size: 14px;
  width: 400px;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: auto;
  top: ${_size.l};
	padding: ${_size.m};
	border-radius: ${_size.m};
	background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
  animation: ${translate} 1s ease-in-out;
  z-index: 10;
  cursor: pointer;
`;

const mapStateToProps = ({ common }) => (common.notification);

const mapDispatchToProps = (dispatch) => ({
  remove: () => dispatch(({
    type: REMOVE_NOTIFICATION,
  })),
});

const colors = {
  success: _color.success,
  error: _color.danger,
};

const Notification = (notification) => {
  const { type, message, content, remove } = notification;

  if (!message) {
    return null;
  }

  return (
    <Wrapper onClick={remove}>
      <Header color={colors[type]}>
        {type}
      </Header>
      <Message>
        {message}
      </Message>
      <div>
        {content}
      </div>
    </Wrapper>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
