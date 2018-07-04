import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { color } from '../../../ui/theme'
import { Image, Icon, Cloud, Spinner, IconLink } from '../../../ui/atoms'
import { Like } from '../../../ui/molecules'
import { ProfileTemplate } from '../../../ui/templates'

import { presentById, storeById } from '../actions';
const mapStateToProps = (state, ownProps) => ({
    ...state.present.presentById,
    historyId: ownProps.match.params.id
});

const mapDispatchToProps = dispatch => ({
    onLoad: id => dispatch(storeById(id))
});


class PresentPage extends React.Component {
    state = { liked: false }

    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }))

    componentDidMount = () => this.props.onLoad(this.props.historyId)


    onRemovePresent = () => true;
    render() {
        const present = this.props;
        return <ProfileTemplate><Cloud rightIcon={<Like liked={this.state.liked} onClick={this.onLike}/>}>
            {present === null ? <Spinner /> : 
                <Wrapper>
                    <Image size='30vh' round src={present.photo} />
                    <Title>{present.title}</Title>
                    <Item>
                        <Item><Icon size='2vh' color='#7496DB' name='UserSimple' />
                            ж, ч </Item>
                        <Item> <Icon size='2vh' color='#7496DB'  name='Clock' />

                            {present.startAge}-{present.endAge}</Item>
                        <Item> <Icon size='2vh' color='#7496DB' name='HeartOutline' />
                               12 </Item>
                    </Item>
                    <Info>{present.content}</Info>
                </Wrapper>}
            <Settings>
                <IconLink color={color.darkGrey} to={`${this.props.match.url}/edit`} name='Pencil' />
                <Icon color={color.darkGrey} onClick={this.onRemovePresent} name='Trash' />
            </Settings>
        </Cloud></ProfileTemplate>;
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(PresentPage);
const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 2rem;

`

const Title = styled.div`
    font-size: 1.6rem;
    text-align: center;
    padding: 1rem;
`

const Item = styled.div`
 display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 0 2rem;
width: 60%;

`

const Info = styled.div`
 padding: 1vh 0;
`

const Settings = styled.div`

position: absolute;
bottom: 2rem;
margin: auto;
left: 0;
right: 0;
display: flex;
width: 20%;
justify-content: space-between;
`