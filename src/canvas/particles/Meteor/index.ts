import { getRandomArbitrary } from '@/utils';
import { Particle } from '@/src/canvas/particles/particles.interface';

/**
 * @description 유성 class
 */
export class Meteor implements Particle {
  active: boolean = true;
  x!: number;
  y!: number;
  radius!: number;
  speedX!: number;
  speedY!: number;
  pixelRatio!: number;
  stageWidth!: number;
  stageHeight!: number;

  constructor(stageWidth: number, stageHeight: number) {
    this.resize(stageWidth, stageHeight);
  }

  resize(stageWidth: number, stageHeight: number): void {
    this.x = getRandomArbitrary(stageWidth / 2, stageWidth);
    this.y = getRandomArbitrary(0, stageHeight / 2);
    this.radius = 3;
    this.speedX = getRandomArbitrary(-5, -3);
    this.speedY = getRandomArbitrary(2, 3);
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    //비가 화면 밖으로 나가던가 opacity 가 0 이하면 다시 init 해줘야함
    if (this.isDead()) {
      //ratio 에 따라 다르게 넣어주었기 때문에.. 이렇게 해야함
      this.resize(
        ctx.canvas.width / this.pixelRatio,
        ctx.canvas.height / this.pixelRatio,
      );
    }

    if (this.active) this.update();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(100, 255, 255, 1)`;
    ctx.fill();
    ctx.closePath();
  }

  //보이지 않거나 시야에서 벗어나면 true
  isDead(): boolean {
    return (
      this.x < 0 ||
      this.x > this.stageWidth ||
      this.y < 0 ||
      this.y > this.stageHeight
    );
  }

  pause(): void {
    this.active = false;
  }

  resume(): void {
    this.active = true;
  }
}
