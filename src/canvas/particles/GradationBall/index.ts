import { getRandomArbitrary } from '@/utils';
import { Particle } from '@/src/canvas/particles/particles.interface';

/**
 * @description 그라데이션 공 class
 * @description 벽에 닿으면 반사되는 공
 * @description 작아지는 커졌다 공
 */
export class GradationBall implements Particle {
  //custom property
  MIN_RADIUS: number = 100;
  MAX_RADIUS: number = 500;
  color = {
    r: getRandomArbitrary(0, 255),
    g: getRandomArbitrary(0, 255),
    b: getRandomArbitrary(0, 255),
  };
  plus: boolean = true;

  //interface property
  active: boolean = true;
  radius: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  stageHeight: number = 0;
  stageWidth: number = 0;
  x: number = 0;
  y: number = 0;

  constructor(stageWidth: number, stageHeight: number) {
    this.resize(stageWidth, stageHeight);
  }

  resize(stageWidth: number, stageHeight: number): void {
    this.x = stageWidth / 2;
    this.y = stageHeight / 2;
    this.radius = getRandomArbitrary(this.MIN_RADIUS, this.MAX_RADIUS);
    this.speedX = getRandomArbitrary(-10, 10);
    this.speedY = getRandomArbitrary(-10, 10);
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > this.stageWidth) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > this.stageHeight) {
      this.speedY *= -1;
    }

    if (this.radius < this.MIN_RADIUS) {
      this.plus = true;
    } else if (this.radius > this.MAX_RADIUS) {
      this.plus = false;
    } else {
      this.radius += this.plus ? 1 : -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.active) this.update();

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius,
    );
    g.addColorStop(
      0,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`,
    );
    g.addColorStop(
      1,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
    );
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  pause(): void {
    this.active = false;
  }

  resume(): void {
    this.active = true;
  }
}
