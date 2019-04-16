import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Card from './Card';
import {searchReadAction} from "../actions/SearchAction";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images: [], showLoading: true, stopLabel: 'Stop', q: '', search: {total_pages: 0}};
        this.getData = this.getData.bind(this);
        this.search = this.search.bind(this);
        this.textInput = React.createRef();
    }

    setFilter(e, filter) {
        e.preventDefault();
        const search = Object.assign({},this.props.search );
        let results = [];
        if(filter === 'favourite') {
            results = search.results.filter( (result) => result.favouriteLater === true );
            search.results = results;
            this.setState({search});
            return;
        }

        if(filter === 'watchLater') {
            results = search.results.filter( (result) => result.watchLater === true );
            search.results = results;
            this.setState({search});
            return;
        }

        this.setState({search: this.props.search});
    }

    search(e, page = 1) {
        e.preventDefault();
        const {searchReadAction} = this.props;
        this.setState({showLoading: true});
        searchReadAction(this.textInput.current.value.length < 1 ? 'flower' : this.textInput.current.value, page);
    }

    getData(nextProps) {
        const {search} = nextProps;

        if (search && Array.isArray(search.results)) {
            const results = search.results.filter(result => result.accessible === true);
            this.setState({search, showLoading: false, results});
            console.log('Inside componentWillReceiveProps search', search);
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


        const N = this.state.search.total_pages > 50 ? 50 : this.state.search.total_pages;
        const footerPages = Array.apply(null, {length: N}).map(Number.call, Number);

        console.log('Search count pages', this.state.search.total_pages, footerPages);

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
                    <div style={{marginTop: '20px'}}>
                        <ul style={{textAlign: 'center'}}>
                            <li style={{float: 'left', display: 'table'}}><button className="page-button" onClick={(e) => this.setFilter(e, 'favourite') } key="fav">Favourites</button></li>
                            <li style={{float: 'left', display: 'table'}}><button className="page-button" onClick={(e) => this.setFilter(e, 'watchLater') } key="fav">Watch Later</button></li>
                            <li style={{float: 'left', display: 'table'}}><button className="page-button" onClick={(e) => this.setFilter(e, 'all') } key="fav">All</button></li>
                        </ul>
                    </div>
                </section>
                <section>
                    <div style={{marginTop: '20px'}}>
                        <ul style={{textAlign: 'center'}}>
                            {
                                footerPages.map((count, i) => <li style={{float: 'left', display: 'table'}}><button className="page-button" onClick={(e) => {this.search(e, count + 1 ); console.log(i);}} key={i}>{count +1 }</button></li>)
                            }
                        </ul>
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

