import { Board } from "./types";
import { createBoard } from "./board";

export interface GameState {
  boardSize: number;
  status: "black" | "white" | "end";
  board: Board;
}

export const initialState = {
  boardSize: 4,
  status: "white" as const,
  board: createBoard(4)
};
