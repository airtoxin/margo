import { useReduxState } from "../../hooks/useReduxState";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setMarble } from "../../modules/game/actions";
import { Cell } from "../../modules/game/types";

export const useGame = () => {
  const board = useReduxState(s => s.game.board);
  const dispatch = useDispatch();
  const handleClickCell = useCallback(
    (cell: Cell) => () => {
      dispatch(setMarble(cell));
    },
    [dispatch]
  );

  return {
    board,
    handleClickCell
  };
};
