import * as React from 'react';
import { PresentCard } from '../organisms'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { all } from '../actions';
import { Spinner } from '../../../ui/atoms'
const mapStateToProps = state => ({
    presents: state.present.presents
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(all())
});

class PresentsList extends React.Component {

    componentWillMount = () => this.props.onLoad()

    render() {
        if (!this.props.presents) {
            return <Spin><Spinner /> </Spin>
        }

        if (this.props.presents.length === 0) {
            return (
                <div className="article-preview">
                    No articles are here... yet.
      </div>
            );
        }
        return (
            <div>
                <List>
                    {
                        this.props.presents.map(present =>
                            <PresentCard key={present.id}
                                present={present} />)
                    }
                </List>
            </div>
        );
    };

}


export default connect(mapStateToProps, mapDispatchToProps)(PresentsList);

const List = styled.div`
    width: 97vw;
    margin: auto;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`
const Spin = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 3rem;
`
