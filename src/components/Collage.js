import React from "react";
import { Photo, replacePhoto } from "../models/flickr";
import DragImage from './DragImage';
import { preventDefault } from '../utils';

export default class Collage extends React.Component {
  state = {
    photos: []
  };

  updatePhotos = xs => {
    this.setState({ photos: xs });
  };

  createImages(images) {
    return images.map(p => (
      <DragImage
        key={p.src}
        src={p.src}
        meta={{ width: p.w, height: p.h }}
        style={{ top: p.y, left: p.x }}
      />
    ));
  }

  // onDrop :: Event -> State Photos
  onDrop = ({
    dataTransfer: dt,
    target: t,
    currentTarget: ct,
    clientX: x,
    clientY: y
  }) => {
    const src = dt.getData("text");
    const w = dt.getData("width");
    const h = dt.getData("height");
    const offset = ct.getBoundingClientRect().top;
    const photo = Photo(src, w, h, x, y - offset);
    console.warn(t);
    this.updatePhotos(replacePhoto(photo, this.state.photos));
  };

  render() {
    return (
      <div
        id="collage"
        onDrop={this.onDrop}
        onDragOver={preventDefault}
      >
        <div id="photos">{this.createImages(this.state.photos)}</div>
      </div>
    );
  }
}
