import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { login } from '../actions';
import { update } from '../../actions';
import { LoginField, Checkbox } from '../../../ui/molecules'
import { Button, Layout, Icon, Error, Spinner } from '../../../ui/atoms'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChange: (name, value) => dispatch(update(name, value)),
    onSubmit: (email, password, remember) => dispatch(login(email, password, remember))
});

class LoginForm extends Component {

    state = { remember: true }

    onRemember = () => this.setState((prevState) => ({ remember: !prevState.remember }))

    onChange = e => this.props.onChange(e.target.name, e.target.value);

    submitForm = e => {
        e.preventDefault();
        const { email, password } = this.props;
        this.props.onSubmit(email, password, this.state.remember);
    }

    render() {
        const { email = '', password = '', loading, error }= this.props;
        return <form onSubmit={this.submitForm}>
            <Layout flow="column" align='center' width='100%' gap={1.6} padding={2}>
                <Social />

                <LoginField
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    icon='User'
                    label='Імя'
                    login
                />

                <LoginField
                    name='password'
                    value={password}
                    onChange={this.onChange}
                    icon='Password'
                    label='Пароль'
                    type='password'
                    login
                />

                <Checkbox
                    onClick={this.onRemember}
                    checked={this.state.remember}
                    text="Запам'ятати мене" />

                <Error error='Невірний логін або пароль' active={error != null && error.status === 401} />

                {
                    loading ? <Spinner />
                        : <Button shine darkblue onClick={this.login}>Увійти</Button>
                }
            </Layout>
        </form>;
    }
}

const Social = () => <Layout flow='row' justify='space-around' width='100%' padding={2}>
            <Icon size='5vh' name="Twitter3D"/>
            <Icon  size='5vh' name="Google3D"/>
            <Icon  size='5vh'name="Facebook3D" />
</Layout>
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
