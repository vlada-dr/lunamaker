import * as React from 'react';
import styled, { css } from 'styled-components'
import { ProfileTemplate } from '../../../ui/templates'
import { Cloud, IconLink } from '../../../ui/atoms'
import { Link, withRouter } from 'react-router-dom'
@withRouter
export default class Offers extends React.Component {
    render() {
        const link = this.props.match.url;
        return <ProfileTemplate>
            <Cloud>
            </Cloud>
        </ProfileTemplate>;
    }
}
