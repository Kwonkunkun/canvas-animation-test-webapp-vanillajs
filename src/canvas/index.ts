import { Canvas } from '@/src/canvas/canvas.interface';
import {
  GradationBallFactory,
  MeteorFactory,
  SnowFactory,
} from '@/src/canvas/particles';
import { CanvasImpl } from '@/src/canvas/CanvasImpl';

//factory pattern

export class CanvasFactory {
  createSnowCanvas(numOfParticle: number): Canvas {
    const snowFactory = new SnowFactory();
    const snows = snowFactory.createParticles(numOfParticle);
    return new CanvasImpl('snow', 0, 0, snows);
  }

  createGradationBallCanvas(numOfParticle: number): Canvas {
    const gradationBallFactory = new GradationBallFactory();
    const gradationBalls = gradationBallFactory.createParticles(numOfParticle);
    return new CanvasImpl('gradationBall', 0, 0, gradationBalls);
  }

  createMeteorCanvas(numOfParticle: number): Canvas {
    const meteorFactory = new MeteorFactory();
    const meteors = meteorFactory.createParticles(numOfParticle);
    return new CanvasImpl('meteor', 0, 0, meteors);
  }
}
