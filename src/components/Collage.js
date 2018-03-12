import React from 'react';
import { append } from 'ramda';

const preventDefault = e => e.preventDefault();

export default class Collage extends React.Component {
  state = {
    photos: [],
  };

  updatePhotos = xs => {
    this.setState({ photos: xs });
  };

  createImages(images) {
    return images.map(src => <img key={src} src={src} />);
  }

  // onDrop :: Event -> State Photos
  onDrop = ({ dataTransfer: dt }) => {
    const src = dt.getData('text');
    this.updatePhotos(append(src, this.state.photos));
  };

  render() {
    return (
      <div
        id="collage"
        onDrop={this.onDrop}
        onDragOver={preventDefault}
        style={styles}
      >
        <div id="photos">{this.createImages(this.state.photos)}</div>
      </div>
    );
  }
}

const styles = {
  height: '30vh',
  borderTop: '2px dotted',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};
