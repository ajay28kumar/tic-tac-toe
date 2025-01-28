
import React, {useState } from "react";

export const TicTacToeContainer = ({ size }) => {
  const [board, setBoard] = useState(Array(size).fill().map(() => Array(size).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return; // Ignore if the cell is already filled or there's a winner

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (isXNext ? "X" : "O") : cell))
    );

    setBoard(newBoard);
    const winnerVal = calculateWinner(newBoard);
    if (winnerVal) {
      setWinner(winnerVal);
    } else {
      const isSpaceAvailable = newBoard.some(line => line.filter(itm => itm === null).length > 0);
      if(isSpaceAvailable === true) {
        setIsXNext(!isXNext);
      } else {
        setWinner("No Winner");
        setTimeout(()=> resetGame(),3000);
      }
    }
  };

  const calculateWinner = (board) => {
    const lines = [];

    // Rows and Columns
    for (let i = 0; i < size; i++) {
      lines.push(board[i]); // Row
      lines.push(board.map((row) => row[i])); // Column
    }

    // Diagonals
    lines.push(board.map((row, idx) => row[idx])); // Main diagonal
    lines.push(board.map((row, idx) => row[size - idx - 1])); // Anti-diagonal

    for (const line of lines) {
      if (line.every((cell) => cell && cell === line[0])) {
        return line[0];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(size).fill().map(() => Array(size).fill(null)));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <h2>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="cell"
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}