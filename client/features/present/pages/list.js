import * as React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from 'ui/atoms';
import { withRouter } from 'react-router-dom';
import { all, like } from '../actions';
import { PresentCard } from '../organisms';


const mapStateToProps = state => ({
  presents: state.present.presents,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(all()),
});

export const chunk = (arr, size) => Array.from({
  length: Math.ceil(arr.length / size),
}, (v, i) => arr.slice(i * size, (i * size) + size));

class ListView extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { presents } = this.props;

    return (
      <div>
        <Header>
          Популярнi
        </Header>
        <Popular>
          {presents && presents.slice(0, 4).map(({ images, slug, favorited }) => (
            <PresentCard
              key={slug}
              src={images[0]}
              to={`/present/${slug}`}
              id={slug}
              favorited={favorited}
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
                <PresentCard
                  main
                  src={row[0].images[0]}
                  to={`/present/${row[0].slug}`}
                  id={row[0].slug}
                  favorited={row[0].favorited}
                />
              </Half>
              <Half>
                {chunk(row.slice(1), 2).map(column => (
                  <Column key={column[0].title}>
                    {
                      column.map(({ images, slug, favorited }) => (
                        <PresentCard
                          key={slug}
                          src={images[0]}
                          to={`/present/${slug}`}
                          id={slug}
                          favorited={favorited}
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
    );
  }
};

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 0 ${size.m};
`;

const Popular = styled(Row)`
  flex-flow: row nowrap;
  
  & > * {
    width: 25%;
  }
`;

const Half = styled.div`
  flex: 1 1 50%;
  display: flex;
  
  ${p => p.second && css`
    order: 2;
  `}
  
   ${p => p.main && css`
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

ListView.propTypes = {
  presents: PropTypes.array,
};

export const PresentsList = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));
