import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { Spinner } from 'ui/atoms'
import { db } from 'features/firebase'
import { all } from '../actions'
import { PresentCard } from '../organisms'


const mapStateToProps = (state) => ({
  presents: state.present.presents,
  user: state.common.user,
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch(all()),
})

class PresentsList extends React.Component {
    componentDidMount = () => {
      this.props.onLoad()
    }

    render() {
      const { presents, user } = this.props

      if (!presents) {
        return <Spin><Spinner /> </Spin>
      }

      if (presents.length === 0) {
        return (
          <div className="article-preview">
                    No articles are here... yet.
          </div>
        )
      }
      return (
        <div>
          <List>
            {
              presents.map((present) => (
                <PresentCard
                  key={present.id}
                  present={present}
                  isLiked={user && (present.users.find((like) => like.id === user.uid) !== undefined)}
                  onLike={() => console.log('gift is liked/unliked')}
                />
            ))
            }
          </List>
        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PresentsList)

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
