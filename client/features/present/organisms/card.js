import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card } from 'ui/atoms'
import { Like } from 'ui/molecules'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'


export const PresentCard = ({ id, isLiked, onLike, present }) => {
  const { slug, photo, title, description, tags, images, favoritesCount, author } = present;

  return (
    <Card photo={images[0]} name={title}>
      <Author>
        {author.username}
      </Author>
      <Content>
        {description}
      </Content>
      <Bottom>
        <Link to={`/present/${id}`}>
          <ReadMore>
            Читати далі
          </ReadMore>
        </Link>
        <Likes >
          <p>
            {favoritesCount}
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


const Author = styled.div`
  font-size: .8em;
  text-transform: uppercase;
  letter-spacing: .3em;
  color: #BFBFBF;
  font-weight: 500;
`

const Content = styled.div`
overflow: hidden;
text-overflow: ellipsis;
display: flex;
justify-content: start;
align-items: center;
`

const Bottom = styled.div`
color: #282F49;
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
position: relative;
padding: 8px;
`

const ReadMore = styled.div`
color: #444C54;
display: flex;
align-items: center;
text-transform: uppercase;
letter-spacing: 0.05em;
font-weight: 500;
font-size: 0.95rem;
span {
  margin: 0.3rem;
}
`


const Likes = styled.div`
 display: flex;
        align-items: center;
        font-weight: 500;

p {
    margin: 0 0.5rem 0 1rem;
}
`
