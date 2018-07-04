import * as React from 'react';
import { Menu, Filter } from '../organisms'
import { PresentsList } from '../../features'


export class Home extends React.Component {
    render() {
        return <div>
            <Filter /><Menu isSearch />
            <PresentsList presents={this.props.presents}/>
        </div>;
    }
}


export default Home;



