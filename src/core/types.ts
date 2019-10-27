export type Board = Cell[][][]; // stages - rows - cells

export interface Place {
  stage: number;
  x: number;
  y: number;
}

export interface Cell extends Place {
  status: "unplayable" | "playable" | MarbleType;
}

export type MarbleType = "black" | "white";
