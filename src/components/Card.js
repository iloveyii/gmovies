import React from 'react';
import {watchLaterAction} from "../actions/WatchAction";
import {favouriteLaterAction} from "../actions/FavouriteAction";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";


const callback = (img) => {
    img.accessible = true;
};

const isImageAccessible = (img) => {
    img.accessible = false;
    const url = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + img.poster_path;
    const image = new Image();
    image.onload = () => callback(img);
    image.src = url;
};

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible : false };
        this.watchLater = this.watchLater.bind(this);
        this.favourite = this.favourite.bind(this);
        this.isImageAccessible = this.isImageAccessible.bind(this);
        this.callback = this.callback.bind(this);
    }

    callback() {
        this.setState({visible : true});
    };

    isImageAccessible(img) {
        const url = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + img.poster_path;
        const image = new Image();
        image.onload = () => this.callback();
        image.src = url;
    }

    watchLater(e) {
        e.preventDefault();
        const { image, watchLaterAction, search} = this.props;
        watchLaterAction(image.id, search);
        console.log('I want to watch later movie with id : ' + image.id);
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps componentWillReceiveProps');
        this.setState({image: nextProps.image});
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillReceiveProps componentWillUpdate');
    }

    componentDidMount() {
        console.log('componentWillReceiveProps componentDidMount');
        const { image } = this.props;
        this.setState({ image });
        this.isImageAccessible(this.props.image);
    }

    favourite(e) {
        e.preventDefault();
        const { image, favouriteLaterAction, search} = this.props;
        favouriteLaterAction(image.id, search);
        this.forceUpdate();
        console.log('I want to add to favourite moview with id : ' + image.id);
    }

    render() {
        const { image } = this.props;

        return (
            <li style={ {display: this.state.visible ? 'block' : 'none'}}>
                <div className="wrapper">
                    <div className="info">
                        <span className="thumb">New   </span>
                        <div className="image">
                            <a href=""><img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + image.poster_path} alt=""/></a>
                        </div>
                        <div className="footer">
                            <h4>{image.original_title.substring(0, 15)}</h4>
                            <ul>
                                <li>
                                    <a onClick={(e) => this.favourite(e)} href="#">
                                    {
                                        (image.favouriteLater && image.favouriteLater === true )
                                            ? <i className="fas fa-star"></i>
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
    favourite: state.favourite,
    search: state.search
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    watchLaterAction,
    favouriteLaterAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Card));
