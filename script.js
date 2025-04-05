window.onload = () => {
    const dancer = document.querySelector('.dancer');
  
    dancer.addEventListener('click', () => {
      dancer.classList.toggle('freestyle');
    });
  };
  
  setInterval(() => {
    const dancer = document.querySelector('.dancer');
    if (dancer.classList.contains('freestyle')) {
      const angle = Math.floor(Math.random() * 360);
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 50 - 25;
      dancer.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    } else {
      dancer.style.transform = '';
    }
  }, 800);