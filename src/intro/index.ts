import '@/styles/globals.css';
import '@/styles/intro.css';
import { AnimatedObject } from '@/src/intro/common.interface';
import { Snow } from '@/src/intro/Snow';
import { Meteor } from '@/src/intro/Meteor';

class IntroApp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stageWidth: number;
  stageHeight: number;
  pixelRatio: number;
  animatedObjects: AnimatedObject[] = [];

  constructor(animatedObjects: AnimatedObject[] = []) {
    //init
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.animatedObjects = animatedObjects;

    //resize 초기에 한번 호출
    this.resize();

    //event
    window.addEventListener('resize', this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
  }

  //화면 resize 시마다 호출되는 함수, canvas 재계산
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    //animated object resize
    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.resize(this.stageWidth, this.stageHeight);
    });
  }

  animate() {
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    //animate object draw
    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.draw(this.ctx);
    });

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  console.log('window onload');

  const snows = [];
  for (let i = 0; i < 40; i++) {
    snows.push(new Snow());
  }

  const meteors = [];
  for (let i = 0; i < 100; i++) {
    meteors.push(new Meteor());
  }

  new IntroApp([...meteors]);
};
