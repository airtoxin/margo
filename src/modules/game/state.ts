import { Board } from "../../core/types";
import { createBoard } from "../../core/board";

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
