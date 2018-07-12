import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, Image, Icon } from 'ui/atoms'
import { Like } from 'ui/molecules'
import { Link } from 'react-router-dom'


export const PresentCard = ({ id, isLiked, onLike, present }) => {
  const { photo, title, content, tags, likes } = present

  return (

    <Card photo={photo} name={title}>
      <Content>
        {content}
      </Content>
      <Bottom>
        <Link to={`/present/${id}`}>
          <ReadMore>
            Читати далі
            <Icon name='RightArrow' size='2vh' />
          </ReadMore>
        </Link>
        <Likes >
          {likes[0] && <User size='3vh' round src={likes[0].photo} />}
          {likes[1] && <User round size='3vh' src={likes[1].photo} />}
          {likes[2] && <User round size='3vh' src={likes[2].photo} />}
          <p>
            {likes.length > 3 ? ` +${likes.length}` : null}
          </p>
          <Like liked={isLiked} onClick={onLike} />
        </Likes>
      </Bottom>
    </Card>
  )
}
PresentCard.propTypes = {
  isLiked: PropTypes.bool,
  onLike: PropTypes.func,
  id: PropTypes.string.isRequired,
  present: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    likes: PropTypes.arrayOf(PropTypes.object),
  }),
}

PresentCard.defaultProps = {
  isLiked: false,
  onLike: null,
  present: {
    content: null,
    tags: [],
    likes: [],
  },
}
const Content = styled.div`
overflow: hidden;
text-overflow: ellipsis;
height: 70%;
display: flex;
justify-content: start;
align-items: center;
`

const Bottom = styled.div`
color: #282F49;
display: flex;
width: 100%;
justify-content: space-between;
max-height: 3vh;
position: relative;
bottom: 0;
`

const ReadMore = styled.div`

color: #444C54;
display: flex;
align-items: center;
text-transform: uppercase;
letter-spacing: 0.05em;
font-weight: 500;
`

const User = Image.extend`
margin-right: -1.5vh;

`

const Likes = styled.div`
 display: flex;
        align-items: center;
        font-weight: 500;

p {
    margin: 0 0.5rem 0 1rem;
}
`
