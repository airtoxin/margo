import { Board, Cell, MarbleType, Place } from "./types";
import produce from "immer";

export const createBoard = (boardSize: number): Board =>
  [...Array(boardSize)].map((_, stage) =>
    [...Array(boardSize - stage)].map((_, y) =>
      [...Array(boardSize - stage)].map((_, x) => ({
        stage,
        x,
        y,
        status: stage === 0 ? "playable" : "unplayable"
      }))
    )
  );

const getCell = (board: Board, place: Place): Cell | undefined => {
  const stage = board[place.stage];
  if (stage) {
    const row = stage[place.y];
    if (row) {
      const cell = row[place.x];
      if (cell) return cell;
    }
  }
};

const getPlatformedPlaces = (board: Board, basePlace: Place): Place[] => {
  const { x, y } = basePlace;
  const platforms = [
    // B = basePlace
    [
      /**
       1 2
       3 B
       */
      getCell(board, { ...basePlace, x: x - 1, y: y - 1 }),
      getCell(board, { ...basePlace, y: y - 1 }),
      getCell(board, { ...basePlace, x: x - 1 }),
      getCell(board, basePlace)
    ],
    [
      /**
       1 2
       B 4
       */
      getCell(board, { ...basePlace, y: y - 1 }),
      getCell(board, { ...basePlace, y: y - 1, x: x + 1 }),
      getCell(board, basePlace),
      getCell(board, { ...basePlace, x: x + 1 })
    ],
    [
      /**
       B 2
       3 4
       */
      getCell(board, basePlace),
      getCell(board, { ...basePlace, x: x + 1 }),
      getCell(board, { ...basePlace, y: y + 1 }),
      getCell(board, { ...basePlace, x: x + 1, y: y + 1 })
    ],
    [
      /**
       1 B
       3 4
       */
      getCell(board, { ...basePlace, x: x - 1 }),
      getCell(board, basePlace),
      getCell(board, { ...basePlace, y: y + 1, x: x - 1 }),
      getCell(board, { ...basePlace, y: y + 1 })
    ]
  ];

  return platforms
    .filter(platformCells =>
      platformCells.every(
        maybeCell =>
          maybeCell &&
          (maybeCell.status === "white" || maybeCell.status === "black")
      )
    )
    .map(platformCells => ({
      ...platformCells[0]!,
      stage: platformCells[0]!.stage + 1
    }));
};

export const placeMarble = (
  board: Board,
  place: Place,
  marbleType: MarbleType
): Board =>
  produce(board, draft => {
    draft[place.stage][place.y][place.x].status = marbleType;

    for (const platformedPlace of getPlatformedPlaces(draft, place)) {
      draft[platformedPlace.stage][platformedPlace.y][
        platformedPlace.x
      ].status = "playable";
    }
  });
