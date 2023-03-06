/**
 * @description animated object interface
 */
export interface AnimatedObject {
  init(stageWidth: number, stageHeight: number): void;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * @description particle interface
 */
export interface Particle extends AnimatedObject {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  stageWidth: number;
  stageHeight: number;
}
