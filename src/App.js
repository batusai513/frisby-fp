import React, { Component } from 'react';
import Flickr from './components/Flickr';
import Collage from './components/Collage';
import './App.css';

class App extends Component {
  state = {
    error: '',
  };
  showError = error => {
    this.setState({ error });
  };
  render() {
    return (
      <div className="App">
        {this.state.error ? <p>this.state.error</p> : null}
        <Flickr showError={this.showError} />
        <Collage />
      </div>
    );
  }
}

export default App;
