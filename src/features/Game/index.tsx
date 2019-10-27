import React, { useMemo } from "react";
import "./styles.css";

export interface Props {
  size: number;
}

export const Game: React.FunctionComponent<Props> = ({ size }) => {
  const stages = useMemo(
    () =>
      [...Array(size)].map((_, stage) =>
        [...Array(size - stage)].map((_, y) =>
          [...Array(size - stage)].map((_, x) => ({ x, y }))
        )
      ),
    [size]
  );

  return (
    <div className="board">
      {stages.map((cells, stage) => (
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
                  className="cell"
                  onClick={() => console.log(stage, cell)}
                >
                  <div className="point" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
