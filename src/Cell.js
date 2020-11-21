import React from 'react';
import './Cell.css';

export default function Cell(props) {

  return (
    <div
      id={`cell-${props.pos.x}-${props.pos.y}`}
      className={"cell" + (props.wall ? " selected" : "") + (props.start ? " start" : "") + (props.end ? " end" : "")}
      onMouseDown={() => props.mouseDownHandler(props.pos)}
      onMouseEnter={() => props.mouseEnterHandler(props.pos)}
      onMouseUp={() => props.mouseLeaveHandler(props.pos)}
      onClick={() => props.clickHandler()}
    >
    </div>
  );
};