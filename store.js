import { createStore } from "redux";

// Reducer untuk mengatur state
function gameReducer(state = initialState, action) {
  switch (action.type) {
    case "SELECT_SQUARE":
      if (calculateWinner(state.squares) || state.squares[action.payload]) {
        return state;
      }
      const newSquares = [...state.squares];
      newSquares[action.payload] = calculateNextValue(state.squares);
      return {
        ...state,
        squares: newSquares,
        xIsNext: !state.xIsNext,
      };
    case "RESET":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Inisialisasi state awal
const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

// Fungsi helper untuk menghitung pemenang dan giliran selanjutnya
function calculateWinner(squares) {
  // ...
}

function calculateNextValue(squares) {
  // ...
}

// Buat store Redux
const store = createStore(gameReducer);

export default store;
