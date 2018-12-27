import * as React from 'react';
import styled, { css } from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { ProfileTemplate } from '../../../ui/templates'
import { Cloud, IconLink } from '../../../ui/atoms'

@withRouter
export default class Likes extends React.Component {
  render() {
    const link = this.props.match.url;

    return (<ProfileTemplate>
      <Cloud />
            </ProfileTemplate>);
  }
}
