import * as React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux';
import { PhotoUnload } from '../atoms'
import { ProfileTemplate } from '../../../ui/templates'
import { Avatar } from '../../../ui/molecules'
import { Link, NavLink, Route } from 'react-router-dom'
import { Account, Password, Contacts } from '../organisms';
import { CloudWrapper } from '../../../ui/atoms'
import { mainEdit, update, blur } from '../actions';

const mapStateToProps = state => ({ ...state.user });

const mapDispatchToProps = dispatch => ({
    onChange: (name, value) => dispatch(update(name, value)),
    onBlur: (name, error) => dispatch(blur(name, error)),
    onSubmit: user => dispatch(mainEdit(user))
});


const Wrapper = CloudWrapper.extend`
    justify-content: flex-start;
align-items: center;
 & > *  {
    margin: 1rem;
 }
`



class EditUser extends React.Component {

    onChangePassword = e => {
        let name = e.target.name,
            value = e.target.value,
            edit = this.props.edit;
        this.props.onChange(name, value);
        if (edit.touched[name] && edit.errors[name].length > 0) {
            this.compare(e);
            this.isComplex(e);
        }
    }

    isComplex = e => (e.target.value.length > 0) && this.props.onBlur('complexity', e.target.value);

    compare = e => (e.target.value.length > 0) &&
        this.props.onBlur('compare',
            [this.props.edit.newPassword, e.target.value]
        )
    onChange = e => {
        let name = e.target.name,
            value = e.target.value,
            edit = this.props.edit;
        this.props.onChange(name, value);
        if (edit.touched[name] && edit.errors[name].length > 0) this.onBlur(e);
    }

    onBlur = e => (e.target.value.length > 0) ? this.props.onBlur(e.target.name, e.target.value) : true;


    onAgeChange = (name, value) => this.props.onChange(name, value)
    onPhoto = value => this.props.onChange('photo', value)
    submitForm = e => {
        e.preventDefault();
        const { name, email, age, photo, gender } = this.props.edit;
        this.props.onSubmit({
            name, email, age, photo, gender
        });
    }
    render() {
        const { user } = this.props;
        const password = this.props.edit,
            errors = this.props.edit.errors;
        return (
            <ProfileTemplate>
                <Wrapper>
                    <Tabs>
                        {TabLink('/edit/account', ' Профіль ')}
                        {TabLink('/edit/password', 'Пароль')}
                        {TabLink('/edit/contacts', 'Контакти')}
                    </Tabs>
                    <Avatar src={user.photo}
                        onChange={this.onPhoto}
                        size='15vh' />
                    <Route path="/edit/account"
                        render={
                            () => <Account
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                onAgeChange={this.onAgeChange}
                                user={this.props.edit}
                                errors={this.props.edit.errors}
                            />
                        }
                    />
                    <Route path="/edit/password"
                        render={
                            () => <Password
                                onChange={this.onChange}
                                onChangePassword={this.onChangePassword}
                                compare={this.compare}
                                isComplex={this.isComplex}
                                password={this.props.edit}
                                errors={this.props.edit.errors}
                            />
                        }
                    />
                    <Route path="/edit/contacts" render={
                        () => <Password
                            onChangePassword={this.onChangePassword}
                            compare={this.compare}
                            isComplex={this.isComplex}
                            password={this.props.edit}
                            errors={this.props.edit.errors}
                        />
                    }
                    />
                </Wrapper>
            </ProfileTemplate>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);


const Tabs = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around; 
    margin: 2vh 0 1vh 0;
`

const Tab = styled.div`
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: flex;
    height: 5vh;
    justify-content: center;
    align-items: center;
    a {
        color: #888890;
        &:hover, &:active {
            color: #888890;
        }
    }
`

const TabLink = (to, title) => <Tab><Link to={to}>{title}</Link></Tab>

