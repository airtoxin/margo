export type Board = Cell[][][]; // stages - rows - cells

export interface Place {
  stage: number;
  x: number;
  y: number;
}

export const isPlace = (input: any): input is Place =>
  !!input &&
  typeof input === "object" &&
  typeof input.stage === "number" &&
  typeof input.x === "number" &&
  typeof input.y === "number";

export interface Cell extends Place {
  status: "unplayable" | "playable" | MarbleType;
}

export const isCell = (input: any): input is Cell =>
  isPlace(input) &&
  ["unplayable", "playable", "white", "black"].includes((input as any).status);

export interface PlacedCell extends Cell {
  status: MarbleType;
}

export const isPlacedCell = (input: any): input is PlacedCell =>
  isPlace(input) && isMarbleType((input as any).status);

export type MarbleType = "white" | "black";

export const isMarbleType = (input: any): input is MarbleType =>
  input === "white" || input === "black";
