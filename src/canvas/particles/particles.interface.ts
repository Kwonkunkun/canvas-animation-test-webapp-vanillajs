import { AnimatedObject } from '@/src/canvas/canvas.interface';

/**
 * @description particle interface
 */
export interface Particle extends AnimatedObject {
  active: boolean;
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  stageWidth: number;
  stageHeight: number;
}
