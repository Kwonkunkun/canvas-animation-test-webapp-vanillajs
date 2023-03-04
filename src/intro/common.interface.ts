/**
 * @description animated object interface
 */
export interface AnimatedObject {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  resize(stageWidth: number, stageHeight: number): void;
}
