import { Reducer } from "redux";
import { GameAction } from "./actions";
import { createBoard, enumerateBoard, placeMarble } from "../../core/board";
import { GameState, initialState } from "./state";

export const game: Reducer<GameState, GameAction> = (
  state = initialState,
  action
) => {
  if (state.status === "end") return state;

  switch (action.type) {
    case "game/changeBoardSize": {
      const boardSize = action.payload.boardSize;
      return { ...state, boardSize, board: createBoard(boardSize) };
    }
    case "game/setMarble": {
      if (
        state.board[action.payload.place.stage][action.payload.place.y][
          action.payload.place.x
        ].status !== "playable"
      ) {
        return state;
      }

      const board = placeMarble(
        state.board,
        {
          stage: action.payload.place.stage,
          y: action.payload.place.y,
          x: action.payload.place.x
        },
        state.status
      );
      const playableCells = enumerateBoard(board).filter(
        cell => cell.status === "playable"
      );
      const nextTurnMarbleType = state.status === "white" ? "black" : "white";
      const status = playableCells.length === 0 ? "end" : nextTurnMarbleType;

      return {
        ...state,
        status,
        board
      };
    }
    case "game/passTurn": {
      return {
        ...state,
        status: state.status === "white" ? "black" : "white"
      };
    }
    default:
      return state;
  }
};
