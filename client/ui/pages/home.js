import React from 'react'
import { Menu, Filter } from '../organisms'
import { PresentsList } from '../../features'


const HomeView = () => (
  <div>
    <Filter />
    <Menu isSearch />
    <PresentsList presents={[]} />
  </div>
)

export const Home = HomeView
