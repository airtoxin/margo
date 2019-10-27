import { useReduxState } from "../../hooks/useReduxState";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setMarble } from "../../modules/game/actions";
import { Cell } from "../../core/types";
import { enumerateBoard } from "../../core/board";

export const useGame = () => {
  const board = useReduxState(s => s.game.board);
  const dispatch = useDispatch();
  const handleClickCell = useCallback(
    (cell: Cell) => () => {
      dispatch(setMarble(cell));
    },
    [dispatch]
  );
  const startAutoPlayEffect = useCallback(() => {
    const id = setTimeout(() => {
      const playableCells = enumerateBoard(board).filter(
        cell => cell.status === "playable"
      );
      if (playableCells.length > 0) {
        const playableCell =
          playableCells[Math.floor(Math.random() * playableCells.length)];
        handleClickCell(playableCell)();
      }
    }, 100);

    return () => clearTimeout(id);
  }, [board, handleClickCell]);

  return {
    board,
    handleClickCell,
    startAutoPlayEffect
  };
};
