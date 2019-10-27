import { Place } from "./types";

export type GameAction = ReturnType<typeof changeBoardSize | typeof setMarble>;

export const changeBoardSize = (boardSize: number) => ({
  type: "game/changeBoardSize" as const,
  payload: {
    boardSize
  }
});

export const setMarble = (place: Place) => ({
  type: "game/setMarble" as const,
  payload: { place }
});
