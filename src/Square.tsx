import React from "react";
import type { Cell } from "./utils/winner";

interface SquareProps {
  value: Cell;
  highlighted: boolean;
  onClick: () => void;
}

export function Square({ value, highlighted, onClick }: SquareProps) {
  const className = `square ${highlighted ? "square--win" : ""} ${value ? `square--${value}` : ""}`;
  return (
    <button className={className} onClick={onClick} aria-label={value ?? "empty cell"}>
      {value}
    </button>
  );
}
