import { AnimatedObject, Canvas } from '@/src/canvas/canvas.interface';

export class CanvasImpl implements Canvas {
  id: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  aspectRatio: number;
  stageWidth: number;
  stageHeight: number;
  animatedObjects: AnimatedObject[] = [];

  constructor(
    id: string,
    stageWidth: number,
    stageHeight: number,
    animatedObjects: AnimatedObject[],
  ) {
    this.id = id;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.aspectRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.animatedObjects = animatedObjects;
  }

  animate(): void {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.draw(this.ctx);
    });
  }

  resize(stageWidth: number, stageHeight: number): void {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.canvas.width = stageWidth * this.aspectRatio;
    this.canvas.height = stageHeight * this.aspectRatio;
    this.ctx.scale(this.aspectRatio, this.aspectRatio);

    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.resize(this.stageWidth, this.stageHeight);
    });
  }

  pause(): void {
    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.pause();
    });
  }

  resume(): void {
    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.resume();
    });
  }
}
