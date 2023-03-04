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

    //resize 한번 호출
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

    //resize 되었으므로 object init 해줘야함
    this.animatedObjects.forEach((animatedObject) => {
      animatedObject.init(this.stageWidth, this.stageHeight);
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

  /**
   * di 를 하기위해 생성시에는 더미값을 넣는다.. init 에서 다시 계산해줄거니까..
   * 흠.. di 때문에 이렇게 했는데, 이게 좋은 방법인지는 모르겠다.
   */

  const snows = [];
  for (let i = 0; i < 40; i++) {
    snows.push(new Snow(0, 0));
  }

  const meteors = [];
  for (let i = 0; i < 100; i++) {
    meteors.push(new Meteor(0, 0));
  }

  new IntroApp([...meteors]);
};
