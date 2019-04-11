import React from 'react';
import {watchLaterAction} from "../actions/WatchAction";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

const isImageAccessible = (url) => {
    const image = new Image();
    image.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + url;
    if(! image.complete) {
        return false;
    }
    if(image.naturalWidth === 0) {
        return false;
    }
    return true;
};

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
        if( ! isImageAccessible(image.poster_path)) {
            // return null;
        }
        return (
            <div className="w-dyn-item w-col w-col-4">
                <div className="items-wrapper">
                    <a className="w-inline-block" href="/product/decor-plate">
                        <div className="image-wrapper">
                            <img alt="" className="project-image"
                                 src="https://uploads-ssl.webflow.com/5cae4ea48bbb46697ada3839/5cae4ea48bbb460c1dda3978_5bb3def89ab3aa39fda26d59_plate-1.png"
                                 />
                                <div className="item-overlay" style="opacity: 0;"></div>
                        </div>
                    </a>
                    <div className="items-content"><a className="item-tittle" href="/product/decor-plate">Decor
                        Plate </a>
                        <div className="items-price">$65.00</div>
                    </div>
                </div>
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
