import { Reducer } from "redux";
import { GameAction } from "./actions";
import { createBoard } from "./board";

export interface GameState {
  boardSize: number;
  board: Board;
}

export type Board = Cell[][][]; // stages - rows - cells

export interface Cell {
  stage: number;
  x: number;
  y: number;
  isVisible: boolean;
}

const initialState = {
  boardSize: 4,
  board: createBoard(4)
};

export const game: Reducer<GameState, GameAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "game/changeBoardSize": {
      return { ...state, boardSize: action.payload.boardSize };
    }
    default:
      return state;
  }
};
