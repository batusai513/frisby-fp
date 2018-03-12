import React from 'react';
import { flickrSearch } from '../models/flickr';
import DragImage from './DragImage';

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

  // updateResults :: [Url] -> State Results
  updateResults = xs => {
    this.setState({ results: xs });
  };

  createImages(images) {
    return images.map(p => (
      <DragImage key={p.src} src={p.src} meta={{ width: p.w, height: p.h }} />
    ));
  }

  render() {
    return (
      <div id="flickr">
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
