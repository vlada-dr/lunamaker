import * as React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Spinner } from 'ui/atoms'
import { Card, Flex, Header } from 'ui/atoms'
import { redirectTo } from 'routes';

import { Link, withRouter } from 'react-router-dom'
import { all } from '../actions'


const mapStateToProps = (state) => ({
  presents: state.present.presents,
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(all()),
});

export const chunk = (arr, size) => Array.from({
  length: Math.ceil(arr.length / size),
}, (v, i) => arr.slice(i * size, (i * size) + size));

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 ${_size.m};
`;

const Popular = styled(Row)`
  flex-flow: row nowrap;
  
  & > * {
    width: 25%;
  }
`;

const Item = styled(Link)`
  padding: ${_size.m};
  display: block;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Half = styled.div`
  flex: 1 1 50%;
  display: flex;
  
  ${(p) => p.second && css`
    order: 2;
  `}
  
   ${(p) => p.main && css`
      div {
        width:100%;
      }
  `}
  
  ${media.pho`
    flex: 1 1 100%;
  `}
`;

const Column = styled.div`
  flex: 1 1 50%;
  height: 50%;
  flex: 1;
`;


class ListView extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { presents, history } = this.props;

    const Image = ({ src, to }) => (
      <Item to={to}>
        <img src={src} /> {/*eslint-disable-line*/}
      </Item>
    );

    return (
      <div>
        <Header>
          Популярнi
        </Header>
        <div>
          Every Sunday we feature
        </div>
        <div>
          the most interesting goods
        </div>
        <Popular>
          {presents && presents.slice(0, 4).map(({ images, slug }) => (
            <Image
              key={slug}
              src={images[0]}
              to={`/present/${slug}`}
            />
          ))}
        </Popular>
        <Header>
          Latest Updates
        </Header>
        {
          presents ? chunk(presents, 5).map((row, i) => (
            <Row key={row[0].title}>
              <Half second={i % 2 !== 0}>
                <Image
                  main
                  src={row[0].images[0]}
                  to={`/present/${row[0].slug}`}
                />
              </Half>
              <Half>
                {chunk(row.slice(1), 2).map((column) => (
                  <Column key={column[0].title}>
                    {
                      column.map(({ images, slug }) => (
                        <Image
                          key={slug}
                          src={images[0]}
                          to={`/present/${slug}`}
                        />
                      ))
                    }
                  </Column>
                ))}
              </Half>
            </Row>
          )) : null
        }
      </div>
    )
  }
}

ListView.propTypes = {
  presents: PropTypes.array,
};

export const PresentsList = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ListView);

