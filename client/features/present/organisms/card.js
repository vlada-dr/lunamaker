import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HeartOutlineIcon, HeartIcon } from 'ui/icons';
import { unfavorite, favorite } from '../actions';


const mapDispatchToProps = dispatch => ({
  like: id => dispatch(favorite(id)),
  unlike: id => dispatch(unfavorite(id)),
});

export const PresentCard = connect(
  null,
  mapDispatchToProps,
)(({
  src, to, id, favorited, like, unlike,
}) => (
  <Item >
    {favorited ? (
      <HeartIcon onClick={() => unlike(id)} />
    ) : (
      <HeartOutlineIcon onClick={() => like(id)} />
    )}
    <Link to={to}>
      <img src={src} />
    </Link>
  </Item>
));

const Item = styled.div`
  padding: ${size.m};
  display: block;
  width: 100%;
  position: relative;

  svg {
    width: 32px;
    height: 32px;
    position: absolute;
    top: ${size.l};
    right: ${size.l};
    fill: white;
    z-index: 10;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

PresentCard.propTypes = {
  id: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  src: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

PresentCard.defaultProps = {
  favorited: false,
};
