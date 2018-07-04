import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import HashTag from '../Shared/Tag';
import { Icon } from '../Shared/Icons';

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '0',
            startAge: '',
            endAge: '',
            likesTags: [],
            celebrationTags: [],
            likes: '',
            celebration: '',
            likesAuto: [],
            celebrationAuto: [],
        };
        this.onChange = this.onChange.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.search = this.search.bind(this);
        this.renderOffers = this.renderOffers.bind(this);
    }


    addTag = tag => {
        let type = tag.type == '0' ? 'likes' : 'celebration';
        this.state[`${type}Tags`].map(x => x.id).indexOf(tag.id) == -1 && this.setState({
            [`${type}Tags`]: this.state[`${type}Tags`].concat({ id: tag.id, name: tag.name }),
            [type]: '',
            [`${type}Auto`]: []
        });
    }

    deleteTag = tag => {
        let type = this.state.likesTags.map(x => x.id).indexOf(tag.id) != -1 ? 'likes' : 'celebration';
        let tags = this.state[`${type}Tags`];
        tags.splice(tags.findIndex(x => x.id === tag.id), 1);
        this.setState({ [`${type}Tags`]: tags })
    }

    openFilter = () => this.props.presentsStore.enableFilter();

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    search = e => {
        e.preventDefault();
        let tags = this.state.likesTags.map(e => Object.assign({}, { id: e.id })).concat(this.state.celebrationTags.map(e => Object.assign({}, { id: e.id })));
        this.props.presentsStore.searchPresents({
            keyWord: this.props.presentsStore.search,
            gender: Number(this.state.gender),
            startAge: Number(this.state.startAge),
            endAge: Number(this.state.endAge),
            tags: tags
        });
    };

    renderOffers = (e) => {
        this.onChange(e);
        const inputValue = e.target.value.trim().toLowerCase(),
            inputLength = inputValue.length,
            suggestions = inputLength === 0 ? [] : this.props.tagsStore[`${e.target.name}Store`].filter(
                item => item.name.toLowerCase().slice(0, inputLength) === inputValue
                    && this.state[`${e.target.name}Tags`].every(x => x.name.toLowerCase().slice(0, inputLength) != inputValue));

        this.setState({ [`${e.target.name}Auto`]: suggestions });
    };


    render() {
        return <div className='filter-form animated fadeInDown '>
            <div className='d-flex w-100 h-75 justify-content-around align-items-center'>
                <div className='d-flex flex-column align-items-center w-25 h-75'>
                    <input className='text'
                        name="startAge"
                        placeholder="Початковий вік"
                        value={this.state.startAge}
                        onChange={this.onChange} />
                    <input className='text'
                        name="endAge"
                        placeholder="Кінцевий вік"
                        value={this.state.endAge}
                        onChange={this.onChange} />
                    <div className='gender d-flex justify-content-around'>
                        {[
                            { value: 1, gender: "male" },
                            { value: 0, gender: "both" },
                            { value: 2, gender: "female" }
                        ].map((item) => <label key={item.value}>
                            <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                            <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender)} ></div>
                        </label>)}
                    </div>

                </div>
                <div className='d-flex flex-column align-items-center'>
                    <input className='text-tag'
                        name="likes"
                        placeholder="Подобається"
                        value={this.state.likes}
                        onChange={this.renderOffers} />
                    <div className='popular-tags d-flex flex-wrap justify-content-start align-items-start'>
                        {this.state.likesTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {this.state.likesAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.addTag.bind(this, tag)} />)}
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <input className='text-tag'
                        name="celebration"
                        placeholder="Свята"
                        value={this.state.celebration}
                        onChange={this.renderOffers} />
                    <div className='popular-tags d-flex flex-wrap justify-content-start align-items-start'>
                        {this.state.celebrationTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {this.state.celebrationAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.addTag.bind(this, tag)} />)}
                    </div>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-center icons'>
                <Icon onClick={this.search} name='Check' width='3vh' height='3vh' fill='#031560' className='icon' />
                <Icon onClick={this.openFilter} name='X' width='2.5vh' height='2.5vh' fill='#600303' className='icon' />
            </div>
        </div>;
    }
}