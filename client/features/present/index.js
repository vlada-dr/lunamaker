import PropTypes from 'prop-types';


export {
  PresentPage,
  PresentsList,
  NewPresent,
  EditPresent,
} from './pages';

export { PresentCard } from './organisms';

export const Present = PropTypes.shape({
  author: PropTypes.shape({
    bio: PropTypes.string,
    following: PropTypes.bool,
    image: PropTypes.string,
    username: PropTypes.string,
  }),
  body: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  createdAt: PropTypes.string,
  description: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
  slug: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  updatedAt: PropTypes.string,
});
