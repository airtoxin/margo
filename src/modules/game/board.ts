import { Board } from "./index";

export const createBoard = (boardSize: number): Board =>
  [...Array(boardSize)].map((_, stage) =>
    [...Array(boardSize - stage)].map((_, y) =>
      [...Array(boardSize - stage)].map((_, x) => ({
        stage,
        x,
        y,
        isVisible: Math.random() < 0.5
      }))
    )
  );
