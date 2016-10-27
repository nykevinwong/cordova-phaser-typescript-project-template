declare module "phaser-swipe" {
    export = Swipe;
}

declare module Swipe {

  interface Direction {
    direction: number;
    x: number;
    y: number;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface Model {
    up?:       (point: Point) => void;
    down?:     (point: Point) => void;
    left?:     (point: Point) => void;
    right?:    (point: Point) => void;
    upLeft?:   (point: Point) => void;
    upRight?:  (point: Point) => void;
    downLeft?: (point: Point) => void;
    downRight?:(point: Point) => void;
  }
}

declare class Swipe {
  constructor(game: Phaser.Game, model?: Swipe.Model);
  check(): Swipe.Direction;
  DIRECTION_LEFT: number;
  DIRECTION_RIGHT: number;
  DIRECTION_UP: number;
  DIRECTION_DOWN: number;
  DIRECTION_UP_LEFT: number;
  DIRECTION_UP_RIGHT: number;
  DIRECTION_DOWN_LEFT: number;
  DIRECTION_DOWN_RIGHT: number;
}

