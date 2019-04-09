import React from 'react';
import { Link } from 'react-router-dom';
import About from './About';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showAbout = this.showAbout.bind(this);
        this.state = { showAbout : false };
    }

    showAbout() {
        this.setState({showAbout: !this.state.showAbout});
    }

    render() {
        return (
            <header>
                <nav id="main-nav">
                    <div className="wrapper">
                        <ul>
                            <li>
                                <Link to={'/'}>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/image'}>
                                    <span>Images</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/about'}>
                                    <span>About</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {
                    this.state.showAbout ?
                        <About/>
                        : null
                }
            </header>
        )
    }
}

export default Header;
