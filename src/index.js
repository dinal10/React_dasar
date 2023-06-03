import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Button, Flex, Text, VStack } from "@chakra-ui/react";
function Square({ value, onClick }) {
  return (
    <Button colorScheme="blue" h="100px" w="100px" variant="outline" borderWidth="2px" borderColor="blue" onClick={onClick}>
      {value}
    </Button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function selectSquare(index) {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = calculateNextValue(squares);
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function calculateStatus(winner, squares, xIsNext) {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every(Boolean)) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, xIsNext);

  function renderSquare(index) {
    return <Square value={squares[index]} onClick={() => selectSquare(index)} />;
  }

  return (
    <VStack>
      <Text className="status">{status}</Text>
      <div className="board">
        <Flex className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </Flex>
        <Flex className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </Flex>
        <Flex className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </Flex>
      </div>
      <Button className="reset-button" onClick={reset}>
        Reset
      </Button>
    </VStack>
  );
}

ReactDOM.render(<Board />, document.getElementById("root"));
