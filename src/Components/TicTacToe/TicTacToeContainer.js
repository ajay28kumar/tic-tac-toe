import React, { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';


export const TicTacToeContainer = ({ size }) => {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => Array(size).fill(null))
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // ✅ Utilisation de useCallback pour éviter le warning
  const calculateWinner = useCallback((board) => {
    const lines = [];

    for (let i = 0; i < size; i++) {
      lines.push(board[i]); // Lignes
      lines.push(board.map(row => row[i])); // Colonnes
    }

    lines.push(board.map((row, idx) => row[idx])); // Diagonale principale
    lines.push(board.map((row, idx) => row[size - idx - 1])); // Diagonale secondaire

    for (const line of lines) {
      if (line.every(cell => cell && cell === line[0])) {
        return line[0];
      }
    }
    return null;
  }, [size]);

  useEffect(() => {
    const winnerVal = calculateWinner(board);
    if (winnerVal) {
      setWinner(winnerVal);
      setIsDraw(false);
    } else if (board.flat().every(cell => cell !== null)) {
      setIsDraw(true);
    }
  }, [board, calculateWinner]); // ✅ Ajout de calculateWinner dans les dépendances

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => [...rowArr]);
      newBoard[row][col] = isXNext ? "X" : "O";
      return newBoard;
    });

    setIsXNext(prev => !prev);
  };

  const resetGame = () => {
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <h2>
        {winner ? `Winner: ${winner}` : isDraw ? "Match Nul!" : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="cell"
                onClick={() => handleClick(rowIndex, colIndex)}
                disabled={cell !== null}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="center">
        <Button className="reset-button" variant="contained" color="primary" onClick={resetGame}>
          Reset Game
        </Button>
      </div>
    </div>
  );
};
