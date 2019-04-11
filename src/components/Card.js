import React from 'react';
import {watchLaterAction} from "../actions/WatchAction";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.watchLater = this.watchLater.bind(this);
        this.favourite = this.favourite.bind(this);
    }

    watchLater(e) {
        e.preventDefault();
        const { image, watchLaterAction, search} = this.props;
        watchLaterAction(image.id, search);
        console.log('I want to watch later movie with id : ' + image.id);
        this.forceUpdate();
    }

    favourite(e) {
        e.preventDefault();
        const { image } = this.props;
        console.log('I want to add to favourite moview with id : ' + image.id);
    }

    render() {
        const { image } = this.props;

        return (
            <li>
                <div className="wrapper">
                    <div className="info">
                        <span className="thumb">New</span>
                        <div className="image">
                            <a href=""><img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + image.poster_path} alt=""/></a>
                        </div>
                        <div className="footer">
                            <h4>{image.original_title}</h4>
                            <ul>
                                <li>
                                    <a onClick={(e) => this.favourite(e)} href="#">
                                    {
                                        (image.favourite && image.favourite === true )
                                            ? <i className="far fa-calendar-check"></i>
                                            : <i className="far fa-star"></i>
                                    }
                                    </a>
                                </li>
                                <li>
                                    <a onClick={(e)=>this.watchLater(e)} href="#">
                                    {
                                        (image.watchLater && image.watchLater === true )
                                        ? <i className="far fa-calendar-check"></i>
                                        : <i className="fas fa-clock"></i>
                                    }
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    watch: state.watch,
    search: state.search
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    watchLaterAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Card));
