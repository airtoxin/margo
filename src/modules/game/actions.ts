import { Place } from "../../core/types";

export type GameAction = ReturnType<
  typeof changeBoardSize | typeof setMarble | typeof passTurn
>;

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

export const passTurn = () => ({
  type: "game/passTurn" as const
});
