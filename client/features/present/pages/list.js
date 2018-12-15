import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Spinner } from 'ui/atoms'
import { PresentCard } from '../organisms'
import { all } from '../actions'


const mapStateToProps = (state) => ({
  presents: state.present.presents,
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(all()),
})

class ListView extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }



  render () {
    const { presents } = this.props;

    return (
      <div>
        <List>
          {
            /* eslint-disable no-nested-ternary */
            !presents
              ? <Spin><Spinner /> </Spin>
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
  }



}
ListView.propTypes = {
  presents: PropTypes.array,
}

export const PresentsList = connect(mapStateToProps, mapDispatchToProps)(ListView)

const List = styled.div`
    width: 100%;
    margin: auto;
    max-width: 1000px;
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
