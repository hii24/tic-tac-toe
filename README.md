# 🎯 tic-tac-toe

Classic tic-tac-toe. 2-player or vs simple unbeatable AI (minimax). Built in a weekend to drill basic React state management.

```
 X | O | X
-----------
 O | X | O
-----------
   | X |
```

## Run locally

```bash
git clone https://github.com/hii24/tic-tac-toe.git
cd tic-tac-toe
npm install
npm start
```

## Files

```
tic-tac-toe/
├── src/
│   ├── App.tsx       # game state, score
│   ├── Board.tsx     # 3×3 grid
│   ├── Square.tsx    # single cell
│   └── utils/
│       ├── winner.ts   # win pattern detection
│       └── minimax.ts  # AI for 1-player mode
└── public/index.html
```

Built April 2021 to drill `useState` + `useReducer` patterns. The minimax AI is unbeatable — best you can do is draw.

MIT License · 2021 Serhii Valko
