import { Particle } from '@/src/canvas/particles/particles.interface';
import { Snow } from '@/src/canvas/particles/Snow';
import { GradationBall } from '@/src/canvas/particles/GradationBall';
import { Meteor } from '@/src/canvas/particles/Meteor';

//factory-method pattern

/**
 * @description particle factory interface
 */
abstract class ParticleFactory {
  abstract createParticles(num: number): Particle[];
}

export class SnowFactory extends ParticleFactory {
  createParticles(num: number): Particle[] {
    return Array.from({ length: num }, () => new Snow(0, 0));
  }
}

export class GradationBallFactory extends ParticleFactory {
  createParticles(num: number): Particle[] {
    return Array.from({ length: num }, () => new GradationBall(0, 0));
  }
}

export class MeteorFactory extends ParticleFactory {
  createParticles(num: number): Particle[] {
    return Array.from({ length: num }, () => new Meteor(0, 0));
  }
}
