import { Board, Cell, isPlacedCell } from "./types";
import { getCell } from "./board";

export const canPlay = (board: Board, cell: Cell): boolean => {
  const targetCell = getCell(board, cell);

  if (!targetCell || targetCell.status !== "playable") return false;

  // TODO: check if marble suddenly died

  return true;
};
