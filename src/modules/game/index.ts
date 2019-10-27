import { Reducer } from "redux";
import { GameAction } from "./actions";
import { createBoard, placeMarble } from "../../core/board";
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

      return {
        ...state,
        status: state.status === "white" ? "black" : "white",
        board: placeMarble(
          state.board,
          {
            stage: action.payload.place.stage,
            y: action.payload.place.y,
            x: action.payload.place.x
          },
          state.status
        )
      };
    }
    default:
      return state;
  }
};
