import '@/styles/globals.css';
import '@/styles/intro.css';

class IntroApp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stageWidth: number;
  stageHeight: number;
  pixelRatio: number;

  constructor() {
    //init
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    //event
    window.addEventListener('resize', this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
  }

  //화면 resize시마다 호출되는 함수, canvas 재계산
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    //animate todo

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  console.log('window onload');
  new IntroApp();
};
