import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TicTacToeContainer } from "../TicTacToeContainer";

describe("TicTacToe Component", () => {
  test("renders the board with the correct size", () => {
    const size = 3;
    render(<TicTacToeContainer size={size} />);

    // Ensure the correct number of buttons are rendered
    const cells = screen.getAllByRole("button", { name: "" });
    expect(cells).toHaveLength(size * size);
  });
  test("displays the correct next player", () => {
    render(<TicTacToeContainer size={3} />);

    // Initial state should show X as the next player
    expect(screen.getByText("Next Player: X")).toBeInTheDocument();

    // Simulate a move
    const firstCell = screen.getAllByRole("button")[0];
    fireEvent.click(firstCell);

    // After the first move, it should show O as the next player
    expect(screen.getByText("Next Player: O")).toBeInTheDocument();
  });

  test("updates the board correctly when a cell is clicked", () => {
    render(<TicTacToeContainer size={3} />);

    const firstCell = screen.getAllByRole("button")[0];
    fireEvent.click(firstCell);

    // The first cell should now display X
    expect(firstCell).toHaveTextContent("X");
  });

  test("does not allow a cell to be clicked twice", () => {
    render(<TicTacToeContainer size={3} />);

    const firstCell = screen.getAllByRole("button")[0];
    fireEvent.click(firstCell); // First click
    fireEvent.click(firstCell); // Second click

    // The first cell should still display X (unchanged)
    expect(firstCell).toHaveTextContent("X");
  });

  test("declares the correct winner", () => {
    render(<TicTacToeContainer size={3} />);

    const cells = screen.getAllByRole("button");

    // Simulate a winning sequence for X
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X (winning move)

    // Ensure the winner is declared
    expect(screen.getByText("Winner: X")).toBeInTheDocument();
  });

  test("resets the game correctly", () => {
    render(<TicTacToeContainer size={3} />);

    const cells = screen.getAllByRole("button");

    // Simulate some moves
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O

    // Click the reset button
    fireEvent.click(screen.getByText("Reset Game"));


    // Ensure the next player is reset to X
    expect(screen.getByText("Next Player: X")).toBeInTheDocument();
  });

})