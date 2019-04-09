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

    watchLater() {
        const { image, watchLaterAction, search} = this.props;
        watchLaterAction(image.id, search);
        console.log('I want to watch later movie with id : ' + image.id);
        this.forceUpdate();
    }

    favourite() {
        const { image } = this.props;
        console.log('I want to add to favourite moview with id : ' + image.id);
    }

    render() {
        const { image } = this.props;
        return (
            <div style={{width: '20%' , float: 'left', overflow: 'hidden'}}>
                <div className="card">
                    <div className="img">
                        <img src={'https://image.tmdb.org/t/p/w94_and_h141_bestv2' + image.poster_path} alt="Image" />
                    </div>
                </div>
                <div className="footer">
                    <h4>
                        <button onClick={this.favourite}>Favourite</button>
                        {
                            (image.watchLater && image.watchLater === true ) ? <span>X</span> : <button onClick={this.watchLater}>Watch Later</button>
                        }

                    </h4>
                    <h3>{image.original_title}</h3>
                    <p>{image.overview}</p>
                    <hr />
                </div>
                <div className="clear"></div>
            </div>
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
