import { useReduxState } from "../../hooks/useReduxState";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { passTurn, setMarble } from "../../modules/game/actions";
import { Cell } from "../../core/types";
import { enumerateBoard } from "../../core/board";
import { canPlay } from "../../core/margo";

export const useGame = () => {
  const board = useReduxState(s => s.game.board);
  const status = useReduxState(s => s.game.status);
  const turnMarbleType = useMemo(() => {
    return status === "white" ? "white" : status === "black" ? "black" : null;
  }, [status]);
  const dispatch = useDispatch();
  const handleClickCell = useCallback(
    (cell: Cell) => () => {
      dispatch(setMarble(cell));
    },
    [dispatch]
  );
  const handleClickPassTurn = useCallback(() => {
    dispatch(passTurn());
  }, [dispatch]);

  const startAutoPlayEffect = useCallback(() => {
    const id = setTimeout(() => {
      // if (Math.random() < 0.1) {
      //   return handleClickPassTurn();
      // }
      const playableCells = enumerateBoard(board).filter(cell =>
        canPlay(board, cell)
      );
      if (playableCells.length > 0) {
        const playableCell =
          playableCells[Math.floor(Math.random() * playableCells.length)];
        handleClickCell(playableCell)();
      }
    }, 300);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, handleClickCell, handleClickPassTurn, status]);

  return {
    board,
    status,
    turnMarbleType,
    handleClickCell,
    startAutoPlayEffect
  };
};
