import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Card from './Card';
import {searchReadAction} from "../actions/SearchAction";


class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images: [], showLoading: true, stopLabel: 'Stop', q: ''};
        this.getData = this.getData.bind(this);
        this.search = this.search.bind(this);
        this.textInput = React.createRef();
    }

    search(e) {
        e.preventDefault();
        const {searchReadAction} = this.props;
        this.setState({showLoading: true});
        searchReadAction(this.textInput.current.value);
    }

    getData(nextProps) {
        const {search} = nextProps;

        if (search && Array.isArray(search.results)) {
            const results = search.results.filter(result => result.accessible === true);
            this.setState({search, showLoading: false, results});
            console.log('Inside componentWillReceiveProps search', search);
            console.log('Inside componentWillReceiveProps test', this.state.search && this.state.search.results.length > 0 && this.state.showLoading === false);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Inside componentWillReceiveProps', nextProps);
        this.getData(nextProps);
    }

    componentDidMount() {
        this.getData(this.props);
    }

    render() {
        let results = [];

        if (this.state.showLoading === false) {
            results = this.state.results.filter(result => result.accessible === true);
        }

        return (
            <div id="cards">
                <section>
                    <div className="search">
                        <div className="search-input">
                            <form onSubmit={this.search}>
                                <input className="form-control"
                                       type="search" placeholder="Search topics or keywords" ref={this.textInput}/>
                                <button><i className="fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="movies">
                        <ul>
                            {
                                this.state.showLoading === false
                                    ?
                                    this.state.search.results.map((image, i) => <Card key={i} image={image}/>)
                                    :
                                    <div id="loading"></div>
                            }
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    images: state.images,
    search: state.search,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    searchReadAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Cards));

