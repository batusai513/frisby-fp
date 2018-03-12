import React from "react";

export default function DragImage({ src, ...props }) {
  return (
    <img
      src={src}
      draggable={true}
      onDragStart={onDragStart}
      {...props}
    />
  );

  function onDragStart({ dataTransfer: dt, currentTarget: ct }) {
    dt.setData("text", src);
  }
}
