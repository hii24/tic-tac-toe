import React from "react";
import { Square } from "./Square";
import type { Cell } from "./utils/winner";

interface BoardProps {
  squares: Cell[];
  winLine: number[];
  onClick: (i: number) => void;
}

export function Board({ squares, winLine, onClick }: BoardProps) {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square key={i} value={value} highlighted={winLine.includes(i)} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
