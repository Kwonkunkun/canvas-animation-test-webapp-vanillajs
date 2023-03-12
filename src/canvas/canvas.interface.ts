/**
 * @description canvas interface
 */
export interface Canvas {
  id: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stageWidth: number;
  stageHeight: number;
  animatedObjects: AnimatedObject[];
  aspectRatio: number;
  fillColor: string;
  animate(): void;
  resize(stageWidth: number, stageHeight: number): void;
  pause(): void;
  resume(): void;
  setFillColor(fillColor: string): void;
}

/**
 * @description animated object interface
 */
export interface AnimatedObject {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  pause(): void;
  resume(): void;
  resize(stageWidth: number, stageHeight: number): void;
}
