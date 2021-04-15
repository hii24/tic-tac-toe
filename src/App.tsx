import React, { useEffect, useState } from "react";
import { Board } from "./Board";
import { calculateWinner, isDraw, type Cell } from "./utils/winner";
import { findBestMove } from "./utils/minimax";
import "./App.css";

type Mode = "1p" | "2p";

export function App() {
  const [mode, setMode] = useState<Mode>("2p");
  const [squares, setSquares] = useState<Cell[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const result = calculateWinner(squares);
  const winLine = result?.line ?? [];
  const draw = !result && isDraw(squares);

  function handleClick(i: number) {
    if (squares[i] || result) return;
    const next = [...squares];
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  // AI move when in 1p mode and it's O's turn
  useEffect(() => {
    if (mode === "1p" && !xIsNext && !result && !isDraw(squares)) {
      const move = findBestMove(squares, "O");
      if (move >= 0) {
        const next = [...squares];
        next[move] = "O";
        setTimeout(() => {
          setSquares(next);
          setXIsNext(true);
        }, 300);
      }
    }
  }, [mode, xIsNext, squares, result]);

  // Track scores
  useEffect(() => {
    if (result?.winner) {
      setScore((s) => ({ ...s, [result.winner!]: s[result.winner!] + 1 }));
    } else if (draw) {
      setScore((s) => ({ ...s, draws: s.draws + 1 }));
    }
  }, [result?.winner, draw]);

  const reset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <main className="app">
      <h1>🎯 tic-tac-toe</h1>

      <div className="mode-switch">
        <button onClick={() => setMode("2p")} className={mode === "2p" ? "active" : ""}>
          2 Player
        </button>
        <button onClick={() => setMode("1p")} className={mode === "1p" ? "active" : ""}>
          vs AI
        </button>
      </div>

      <div className="status">
        {result ? `${result.winner} wins!` : draw ? "Draw" : `${xIsNext ? "X" : "O"}'s turn`}
      </div>

      <Board squares={squares} winLine={winLine} onClick={handleClick} />

      <div className="scoreboard">
        <span>X: {score.X}</span>
        <span>O: {score.O}</span>
        <span>Draws: {score.draws}</span>
      </div>

      <button className="reset" onClick={reset}>New game</button>
    </main>
  );
}
