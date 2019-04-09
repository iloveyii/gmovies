import React from 'react';
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";

import Card from './Card';
import {imageloaderReadAction} from "../actions/ImageloaderAction";

import api from '../api/feed';



class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = { images: [], showLoading: true, stopLabel : 'Stop', q : '' };
        this.getData = this.getData.bind(this);
        this.search = this.search.bind(this);
        this.refresh = this.refresh.bind(this);
        this.stop = this.stop.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.textInput = React.createRef();
    }

    search(e) {
        e.preventDefault();
        this.setState({ q : this.textInput.current.value });
        console.log(this.textInput.current.value);

        api.feed.search(this.textInput.current.value).then( res => {
            console.log(res);
            this.setState({search : res});
        });

    }
    getData(nextProps) {
        const { images } = nextProps;

        if(images && Array.isArray(images)) {
            this.setState({images, showLoading: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Inside componentWillReceiveProps');
        this.getData(nextProps);
    }

    refresh() {
        const { imageloaderReadAction } = this.props;
        this.setState({showLoading: true});
        imageloaderReadAction();
    }
    stop() {
        console.log('Cleared interval');
        const { imageloaderReadAction } = this.props;
        if(this.state.stopLabel == 'Stop') {
            this.setState({stopLabel: 'Start'});
            clearInterval(this.handleInterval);
        } else {
            imageloaderReadAction();
            this.setState({stopLabel: 'Stop'});
            this.setTimer();
        }
    }
    setTimer() {
        const { imageloaderReadAction } = this.props;
        this.handleInterval = setInterval( ()=>{
            imageloaderReadAction();
        }, 30000);
    }

    componentDidMount() {
        this.getData(this.props);
        this.setTimer();
    }

    render() {
        return (
            <div id="cards">
                <section>
                    <div className="search">
                        <div className="search-input">
                            <form onSubmit={this.search}>
                                <input className="form-control"
                                       type="search" placeholder="Search topics or keywords" ref={this.textInput} />
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper">
                        <div className="card">
                            <button className="btn fifth left" onClick={this.refresh}>Refresh</button>
                            <button className="btn fifth right" onClick={this.stop}>{this.state.stopLabel}</button>
                        </div>
                    </div>
                </section>

                {
                    this.state.images && this.state.images.length > 0 && this.state.showLoading === false
                        ?
                        this.state.images.map((image, i) => <Card key={i} image={image}/>)
                        :
                        <div id="loading"></div>
                }
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
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    imageloaderReadAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Cards));

