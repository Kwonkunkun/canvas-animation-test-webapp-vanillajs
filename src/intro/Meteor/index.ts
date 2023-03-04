import { AnimatedObject } from '@/src/intro/common.interface';
import { getRandomArbitrary } from '@/utils';

/**
 * @description 유성 class
 */
export class Meteor implements AnimatedObject {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacityMinus: number;
  pixelRatio: number;

  constructor(
    x: number = 0,
    y: number = 0,
    speedX: number = 0,
    speedY: number = 10,
    opacity: number = 1,
    opacityMinus: number = Math.random() * 0.01,
  ) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = opacity;
    this.opacityMinus = opacityMinus;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
  }

  init(stageWidth: number, _stageHeight: number): void {
    this.x = getRandomArbitrary(0, stageWidth);
    this.y = 0;
    this.speedX = getRandomArbitrary(-1, 1);
    this.speedY = getRandomArbitrary(5, 10);
    this.opacity = getRandomArbitrary(0.8, 1);
    this.opacityMinus = getRandomArbitrary(0.001, 0.005);
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.opacityMinus;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    //비가 화면 밖으로 나가던가 opacity 가 0 이하면 다시 init 해줘야함
    if (this.isDead()) {
      //ratio 에 따라 다르게 넣어주었기 때문에.. 이렇게 해야함
      this.init(
        ctx.canvas.width / this.pixelRatio,
        ctx.canvas.height / this.pixelRatio,
      );
    }

    this.update();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(100, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  //이때 눈을 init 해줘야함
  resize(stageWidth: number, stageHeight: number): void {
    this.init(stageWidth, stageHeight);
  }

  //opacity 가 0 이하가 되면 다시 init 해줘야함
  isDead(): boolean {
    return this.opacity <= 0;
  }
}
