import {
  GET_TAGS,
} from 'types'

import { tag } from 'api'


export const getTags = () => ({
  type: GET_TAGS,
  payload: tag.all(),
})
