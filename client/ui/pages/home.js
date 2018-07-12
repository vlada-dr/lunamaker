import React from 'react'
import PropTypes from 'prop-types'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Menu, Filter } from '../organisms'
import { PresentsList } from '../../features'


const enhance = compose(
  firebaseConnect(['presents']),
  connect(({ firebase }) => ({
    presents: firebase.data.presents,
  })),
)

const HomeView = () => (
  <div>
    <Filter />
    <Menu isSearch />
    <PresentsList />
  </div>
)

export const Home = enhance(HomeView)

