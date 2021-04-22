import type { Cell } from "./winner";
import { calculateWinner } from "./winner";

interface Score {
  score: number;
  move: number;
}

export function findBestMove(squares: Cell[], aiPlayer: "X" | "O"): number {
  const human = aiPlayer === "X" ? "O" : "X";

  function minimax(state: Cell[], depth: number, isMax: boolean): Score {
    const result = calculateWinner(state);
    if (result?.winner === aiPlayer) return { score: 10 - depth, move: -1 };
    if (result?.winner === human) return { score: depth - 10, move: -1 };
    if (state.every((s) => s !== null)) return { score: 0, move: -1 };

    let best: Score = { score: isMax ? -Infinity : Infinity, move: -1 };

    for (let i = 0; i < 9; i++) {
      if (state[i] !== null) continue;
      const next = [...state];
      next[i] = isMax ? aiPlayer : human;
      const { score } = minimax(next, depth + 1, !isMax);

      if (isMax ? score > best.score : score < best.score) {
        best = { score, move: i };
      }
    }
    return best;
  }

  return minimax(squares, 0, true).move;
}
