import React from 'react'
import styled, {css } from 'styled-components'
import PropTypes from 'prop-types'
import { Card, Image, Icon } from '../../../ui/atoms'
import { Like } from '../../../ui/molecules'
import { Link } from 'react-router-dom';

export class PresentCard extends React.Component {
   
    state = { liked: false }

    
    onLike = () => {
        this.setState(prevState => ({ liked: !prevState.liked }));
        console.log(this.state.liked)

    }
        render() {
        const { present } = this.props;
        return <Card photo={present.photo} name={present.title}>
            <Content>
                {present.content}
            </Content>
            <Bottom>
                <Link to={`/present/${present.id}`}><ReadMore >
                    Читати далі
                        <Icon name='RightArrow' size='2vh' />
                </ReadMore></Link>
                <Likes >
                    <User size='3vh' round src='https://www.handletheheat.com/wp-content/uploads/2015/02/Chocolate-Raspberry-Cupcakes-square.jpg' />
                    <User round size='3vh' src='https://merrybee.com.ua/wp-content/uploads/2017/05/DSC_1829-min.jpg' />
                    <User round size='3vh' src='http://shop.djournal.com.ua/published/publicdata/DMAGAZIN/attachments/SC/products_pictures/oh-my-book-ua-bir-11.jpg' />
                    +10
                    <Like liked={this.state.liked} onClick={this.onLike} />
                </Likes>
            </Bottom>
            </Card>;
    }
}

const Content = styled.div`
overflow: hidden;
text-overflow: ellipsis;
height: 70%;
display: flex;
justify-content: start;
align-items: center;
`

const Bottom = styled.div`
color: #282F49;
display: flex;
width: 100%;
justify-content: space-between;
max-height: 3vh;
position: relative;
bottom: 0;
`

const ReadMore = styled.div`

color: #444C54;
display: flex;
align-items: center;
text-transform: uppercase;
letter-spacing: 0.05em;
font-weight: 500;
`

const User = Image.extend`
margin-right: -2vh;

`

const Likes = styled.div`
 display: flex;
        align-items: center;
        font-weight: 500;
width:13vh;
justify-content: space-between;
`