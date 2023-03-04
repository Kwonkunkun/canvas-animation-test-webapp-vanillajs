import '@/styles/globals.css';
import '@/styles/main.css';

const cards = document.querySelector('#cards') as HTMLElement;

if (cards) {
  cards.addEventListener('mousemove', (e) => {
    for (const card of document.querySelectorAll('.card')) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cardStyle = (card as HTMLElement).style;

      cardStyle.setProperty('--mouse-x', `${x}px`);
      cardStyle.setProperty('--mouse-y', `${y}px`);
    }
  });
}
