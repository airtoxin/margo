import { Board } from "./index";

export const createBoard = (boardSize: number): Board =>
  [...Array(boardSize)].map((_, stage) =>
    [...Array(boardSize - stage)].map((_, y) =>
      [...Array(boardSize - stage)].map((_, x) => ({
        stage,
        x,
        y,
        isVisible: stage === 0,
        marble:
          Math.random() > 0.5
            ? undefined
            : Math.random() < 0.25
            ? "black"
            : "white"
      }))
    )
  );
