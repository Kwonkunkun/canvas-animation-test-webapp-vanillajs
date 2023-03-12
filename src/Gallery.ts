import '@/styles/globals.css';
import '@/styles/gallery-scene.css';
import { clamp } from '@/utils';

/**
 * @description Gallery app
 */
export class GalleryScene {
  gallery: HTMLElement;
  galleryItems: NodeListOf<HTMLElement>;
  mouseDownAt: number = 0;
  prevPercentage: number = 0;
  percentage: number = 0;

  constructor() {
    this.gallery = document.querySelector('.gallery') as HTMLElement;
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.registEvents();
  }

  registEvents() {
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseDown(e: MouseEvent) {
    this.mouseDownAt = e.clientX;
  }

  handleMouseMove(e: MouseEvent) {
    if (this.mouseDownAt === 0) return;

    const mouseDelta = e.clientX - this.mouseDownAt;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100;
    const nextPercentage = clamp(this.prevPercentage + percentage, -100, 0);

    this.percentage = nextPercentage;

    this.gallery.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: 'forwards' },
    );

    for (const image of this.galleryItems) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: 'forwards' },
      );
    }
  }

  handleMouseUp(_e: MouseEvent) {
    this.mouseDownAt = 0;
    this.prevPercentage = this.percentage;
  }
}
