import React, { useEffect } from "react";
import "./styles.css";
import { useGame } from "./hooks";

export interface Props {
  size: number;
}

export const Game: React.FunctionComponent<Props> = ({ size }) => {
  const {
    board,
    turnMarbleType,
    handleClickCell,
    startAutoPlayEffect
  } = useGame();
  useEffect(startAutoPlayEffect, [startAutoPlayEffect]);

  return (
    <div>
      <h1>TURN PLAYER = {turnMarbleType}</h1>
      <div className="board">
        {board.map((cells, stage) => (
          <div
            key={stage}
            className={`stage ${stage === 0 && "zero"}`}
            style={{
              zIndex: stage,
              top: `${2 * stage}em`,
              left: `${2 * stage}em`
            }}
          >
            {cells.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map(cell => (
                  <div
                    key={`${cell.x}_${cell.y}`}
                    className={`cell status-${cell.status}`}
                    onClick={handleClickCell(cell)}
                  >
                    {cell.status === "playable" ? (
                      <div className="point" />
                    ) : cell.status === "black" || cell.status === "white" ? (
                      <div className={`marble ${cell.status}`} />
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
