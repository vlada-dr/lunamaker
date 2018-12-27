import React from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'ui/atoms';
import { Link } from 'react-router-dom';


export const NotFoundPage = () => (
  <Layout flow='column' align='center'>
    <h1>404</h1>
    <p>Ой! Щось пішло не так</p>
    <p>Ми не змогли знайти потрібну сторінку</p>
    <p>Чому б вам не повернутися на головну сторінку?</p>
    <Button secondary>
      <Link to='/'>
        Повернутися на головну сторінку
      </Link>
    </Button>
  </Layout>
);
