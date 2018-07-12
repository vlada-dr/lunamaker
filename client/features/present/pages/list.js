import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { Spinner } from 'ui/atoms'
import { PresentCard } from '../organisms'


const enhance = compose(
  firebaseConnect(['presents']),
  connect(({ firebase }) => ({
    presents: firebase.data.presents,
  })),
)

const ListView = ({ presents }) => (
  <div>
    <List>
      {
        /* eslint-disable no-nested-ternary */
        !isLoaded(presents)
        ? <Spin><Spinner /> </Spin>
        : isEmpty(presents)
          ? 'Present list is empty'
          : presents.map((present) => (
            <PresentCard
              key={present}
              present={present}
              id={present.id}
              isLiked={false}
              onLike={() => console.log('gift is liked/unliked')}
            />
          ))
      }
    </List>
  </div>
)

ListView.propTypes = {
  presents: PropTypes.objectOf(PropTypes.any).isRequired,
}
export const PresentsList = enhance(ListView)

const List = styled.div`
    width: 97vw;
    margin: auto;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`
const Spin = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 3rem;
`
