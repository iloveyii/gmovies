import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import Services from './components/Services';
import Cards from './components/Cards';
import About from './components/About';
import Ni from './components/Ni';
import Header from './components/Header';
import './sass/styles.css';
import './sass/movie.css';

class App extends Component {

  render() {
    return (
        <div>
          <Header/>
          <Switch>
            <Route exact path={`/image`} component={Cards} />
            <Route exact path={`/about`} component={About} />
            <Route exact path={`/`} component={Cards} />
            <Route component={Ni} />
          </Switch>
        </div>
    );
  }
}

export default App;

