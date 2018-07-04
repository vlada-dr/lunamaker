import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { ProfileTemplate } from '../../../ui/templates'
import { Avatar, Tag } from '../../../ui/molecules'
import { Cloud, Icon, IconLink, Flex } from '../../../ui/atoms'
import { Cloudlet, Add } from '../atoms'

import { onLoad } from '../actions'


const mapStateToProps = state => ({
    user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    onUnload: () => true,
    onLoad: () => dispatch(onLoad())
});

class ProfilePage extends React.Component {

    componentDidMount = () => this.props.onLoad();

    render() {
        const { user } = this.props;
        return <ProfileTemplate>
            <Cloud
                leftIcon={<Icon name='Search' color='#888898' size='2.5vh'/>}
                rightIcon={<IconLink to={'/edit/account'} color='#888898' name='Edit' size='2.5vh' />}
            >
                <Main>
                    <Flex column align='center'>
                        <Avatar src={user.photo} size='15vh' />
                        <Name>{user.name}</Name>
                        <Age>{user.age.split('T')[0]}</Age>
                    </Flex>
                    <Tags>
                        <Input placeholder='+'/>
                        <Tag name='Instagram' check />
                        <Tag name='кушать' check />
                        <Tag name='спать' check />
                        <Tag name='красивые фотки' check />
                        <Tag name='одежда' check />
                    </Tags>
                </Main>
                <Cloudlet presents={presents} title='Друзі' to={`/id${user.id}/friends`} />
                <Cloudlet presents={presents} title='Вподобані подарунки' to={`/id${user.id}/likes`} />
                <Cloudlet presents={presents} title='Запропоновані подарунки' isAdd to={`/id${user.id}/offers`} />
                <Flex width='100%' justify='space-around' p='0 20%'>
                    <Icon name="Twitter3D" />
                    <Icon name="Google3D" />
                    <Icon name="Facebook3D" />
                </Flex>
            </Cloud>
        </ProfileTemplate>;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

const presents = [
    { id: 1, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 2, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 3, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 4, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
   ];



const Input = styled.input`
    font-family: 'Lobster', cursive;
    width: 4vh;
    border: none;
    background-color: transparent;
    transition: all 300ms ease-in-out;
    margin: 0.2vh;
    padding: 0.5vh;
    text-align: center;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-radius: 2vh;
        width: 8vh;
        padding: 0.25rem 0.4rem;
        outline: none;
        border: 1px solid #ECE4F4;
        background: rgba(255, 255, 255, 0.5);
    }

    &::-webkit-input-placeholder {
        color: #31394D;
    font-weight: 500;
    }

    &::-moz-placeholder {
        color: #31394D;
    font-weight:500;
    }
`

const Main = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    height: 25%;
    width: 100%; 
    margin-top: 2rem;
    padding:1rem 2rem;

`

const Tags = styled.div`
    display:flex;
    width: 75%;
    padding: 1rem;
    flex-wrap:wrap;
`

const Name = styled.span`
    font-family: 'Source Sans Pro', sans-serif;
    letter-spacing: 0.07rem;
    font-size: 1.5rem;
    color: #31394D;
    font-weight: bold;
`

const Age = styled.span`
    font-weight: 400;
    color: #6A7183;
    font-size: 1rem;
    letter-spacing: 0.08rem;
`


