import React from "react";

export default function DragImage({ src, meta, ...props }) {
  return (
    <img src={src} draggable={true} onDragStart={onDragStart} {...props} />
  );

  function onDragStart({
    dataTransfer: dt,
    currentTarget: ct,
    clientX: x,
    clientY: y
  , ...props}) {
    console.warn(x, y, ct, props);
    dt.setData("text", src);
    dt.setData("width", meta.width);
    dt.setData("height", meta.height);
  }
}
