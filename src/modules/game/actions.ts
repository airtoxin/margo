import { GameState } from "./index";

export type GameAction = ReturnType<typeof changeBoardSize>;

export const changeBoardSize = (boardSize: GameState["boardSize"]) => ({
  type: "game/changeBoardSize" as const,
  payload: {
    boardSize
  }
});
