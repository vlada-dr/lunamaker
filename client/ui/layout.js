import * as React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'
import { rootRoutes } from 'routes'
import { LOAD_USER } from 'types'
import { auth } from 'api'

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  user: state.common.user,
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => dispatch({ type: LOAD_USER, payload: auth.current() }),
})

export class Layout extends React.Component {
  componentDidMount() {
    const token = window.localStorage.getItem('jwt')

    this.props.onLoad();
  }


  render() {
    return (
      <Wrapper>
        <Content>
          {rootRoutes()}
        </Content>
        <Bubbles />
      </Wrapper>
    )
  }
}


export const App = hot(module)(() => (
  <div>
    {rootRoutes()}
  </div>
))

export default connect(mapStateToProps, mapDispatchToProps)(Layout)


const Bubbles = () => <Bubs>
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
  <Bubble /><Bubble /><Bubble /><Bubble />
</Bubs>

const Content = styled.div`
    z-index: 3;
    position:relative;
    padding-top: 10vh;
`

const icon = {
  color: 'white',
  fontSize: '3rem',
  height: '3rem',
  width: '3rem',
  margin: '1rem'
}

const Footer = styled.div`
    padding: 2.5rem;
    font-weight: 400;
    color: white;
    text-align: center;
    position: relative;
    bottom: 0;
    width:100%;
    letter-spacing: 0.1rem;
    font-size: 1.1rem;
`

const Bubs = styled.div`
    position: fixed;
	left: 0;
	width: 100vw;
    height: 120vh;
    top: -20vh;
	z-index: 1;
    overflow: hidden;
`

const square = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(-150vh) rotate(600deg); }
`
const Wrapper = styled.div`
    top: 0;
    left: 0;
    position: absolute;
    width:100%;
    min-height: 100vh;
  background: linear-gradient(to right,#fdfbfb,#ebedee); 
  
`
//  background: linear-gradient(to right, #bdc2e8,#e6dee9);

const Bubble = styled.div`
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255, 0.15);
    bottom: -15vh;
    animation: ${square} 25s infinite;

	&:nth-child(1){
		left: 10%;
	}

    &:nth-child(2){
		left: 20%;
		width: 80px;
		height: 80px;
		animation-delay: 2s;
		animation-duration: 17s;
	}
		
	&:nth-child(3){
		left: 25%;
		animation-delay: 4s;
	}
		
	&:nth-child(4){
		left: 40%;
		width: 60px;
		height: 60px;
		animation-duration: 22s;
		background-color: rgba(255,255,255, 0.25);
	}
		
	&:nth-child(5){
		left: 70%;
	}
		
	&:nth-child(6){
		left: 80%;
		width: 120px;
		bottom: -30%;
		height: 120px;
		animation-delay: 3s;
		background-color: rgba(255,255,255,0.2);
	}
		
	&:nth-child(7){
		left: 32%;
		width: 160px;
		height: 160px;
		bottom: -30%;
		animation-delay: 7s;
	}
		
	&:nth-child(8){
		left: 55%;
		width: 20px;
		height: 20px;
		animation-delay: 15s;
		animation-duration: 40s;
	}
		
	&:nth-child(9){
		left: 25%;
		width: 10px;
		height: 10px;
		animation-delay: 2s;
		animation-duration: 40s;
		background-color: rgba(255,255,255, 0.3);
	}
		
	&:nth-child(10){
		left: 90%;
		width: 160px;
		height: 160px;
		bottom: -30%;
		animation-delay: 11s;
	}
	
	${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1].map((a, i) => css`
  &:nth-child(${i+11}){
		left: ${i*(20%i + 3)}%;
		width: ${25*(40%i + 5)}px;
		height:${25*(40%i+ 5)}px;
		bottom: ${-10*(33%i + 2)}%;
		animation-delay: ${10%i}s;
		${i % 3 === 0 && css`
		animation-duration: 7s;
		`}
			background-color: rgba(255,255,255, ${(i%3)/10});
	}
	`)}
`
