import React from 'react';
import { flickrSearch } from '../models/flickr';

export default class Flickr extends React.Component {
  state = {
    term: '',
    results: [],
  };

  // termChanged :: Event -> State Term
  termChanged = ({ currentTarget: t }) => {
    this.setState({ term: t.value });
  };

  searchClicked = _ => {
    flickrSearch(this.state.term).fork(
      this.props.showError,
      this.updateResults
    );
  };

  updateResults = xs => {
    this.setState({ results: xs });
  };

  onDragStart = ({ dataTransfer: dt, currentTarget: t }) => {
    dt.setData('text', t.src);
  };

  createImages(images) {
    return images.map(src => (
      <img
        key={src}
        src={src}
        draggable={true}
        onDragStart={this.onDragStart}
      />
    ));
  }

  render() {
    return (
      <div style={styles}>
        <input
          onChange={this.termChanged}
          value={this.state.term}
          type="text"
        />
        <button onClick={this.searchClicked}>Search</button>
        <div id="results">{this.createImages(this.state.results)}</div>
      </div>
    );
  }
}

const styles = {
  paddingBottom: '30vh',
  height: '70vh',
  overflow: 'auto'
};