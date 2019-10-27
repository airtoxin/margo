import React from "react";
import "./styles.css";
import { useReduxState } from "../../hooks/useReduxState";

export interface Props {
  size: number;
}

export const Game: React.FunctionComponent<Props> = ({ size }) => {
  const board = useReduxState(s => s.game.board);

  return (
    <div className="board">
      {board.map((cells, stage) => (
        <div
          key={Math.random()}
          className={`stage ${stage === 0 && "zero"}`}
          style={{
            zIndex: stage,
            top: `${2 * stage}em`,
            left: `${2 * stage}em`
          }}
        >
          {cells.map(row => (
            <div key={Math.random()} className="row">
              {row.map(cell => (
                <div
                  key={`${cell.x}_${cell.y}`}
                  className={`cell isVisible-${cell.isVisible}`}
                  onClick={() => console.log(stage, cell)}
                >
                  {!cell.marble ? (
                    <div className="point" />
                  ) : (
                    <div className={`marble ${cell.marble}`} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
