import '@/styles/globals.css';
import '@/styles/main.css';
import { CanvasFactory } from '@/src/canvas';
import { Canvas } from '@/src/canvas/canvas.interface';

type CanvasType = 'snow' | 'gradationBall' | 'meteor';

/**
 * @description app class
 */
class App {
  activeCanvas: CanvasType = 'meteor';
  canvasGroup: Canvas[];
  constructor(canvasGroup: Canvas[]) {
    document.body.append(
      ...canvasGroup.map((canvas) => {
        return canvas.canvas;
      }),
    );
    this.canvasGroup = canvasGroup;

    //activeCanvas 에 따라서 canvas 의 update 를 실행할지 말지 결정
    this.canvasGroup.forEach((canvas) => {
      if (canvas.id === this.activeCanvas) {
        canvas.resume();
      } else {
        canvas.pause();
      }
    });

    window.addEventListener('resize', this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.resize();
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.canvasGroup.forEach((canvas) => {
      canvas.animate();
    });
  }

  resize() {
    const stageWidth = document.body.clientWidth / 4;
    const stageHeight = document.body.clientHeight / 4;

    this.canvasGroup.forEach((canvas) => {
      canvas.resize(stageWidth, stageHeight);
    });
  }
}

window.onload = () => {
  const canvasFactory = new CanvasFactory();

  new App([
    canvasFactory.createSnowCanvas(10),
    canvasFactory.createGradationBallCanvas(10),
    canvasFactory.createMeteorCanvas(5),
  ]);
};
