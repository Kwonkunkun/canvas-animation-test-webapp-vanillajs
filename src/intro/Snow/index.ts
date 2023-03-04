import { Particle } from '@/src/intro/common.interface';
import { getRandomArbitrary } from '@/utils';

/**
 * @description 눈 class
 * @description constructor 가 없는 이유는 init 에서 초기화 해주기 때문에
 */
export class Snow implements Particle {
  x!: number;
  y!: number;
  radius!: number;
  speedX!: number;
  speedY!: number;
  opacity!: number;
  opacityMinus!: number;
  pixelRatio!: number;
  stageWidth!: number;
  stageHeight!: number;

  constructor(stageWidth: number, stageHeight: number) {
    this.init(stageWidth, stageHeight);
  }

  init(stageWidth: number, stageHeight: number): void {
    this.x = getRandomArbitrary(0, stageWidth);
    this.y = getRandomArbitrary(0, stageHeight / 3);
    this.radius = getRandomArbitrary(5, 10);
    this.speedX = getRandomArbitrary(-1, 1);
    this.speedY = getRandomArbitrary(1, 5);
    this.opacity = getRandomArbitrary(0.8, 1);
    this.opacityMinus = getRandomArbitrary(0.001, 0.005);
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.opacityMinus;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    //눈이 화면 밖으로 나가던가 opacity 가 0 이하면 다시 init 해줘야함
    if (this.isDead()) {
      //ratio 에 따라 다르게 넣어주었기 때문에.. 이렇게 해야함
      this.init(
        ctx.canvas.width / this.pixelRatio,
        ctx.canvas.height / this.pixelRatio,
      );
    }

    this.update();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  //보이지 않거나 시야에서 벗어나면 true
  isDead(): boolean {
    return (
      this.x < 0 ||
      this.x > this.stageWidth ||
      this.y < 0 ||
      this.y > this.stageHeight ||
      this.opacity <= 0
    );
  }
}
