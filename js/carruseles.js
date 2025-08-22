document.querySelectorAll('.carousel').forEach(carousel => {
  const inner = carousel.querySelector('.carousel-inner');
  const items = inner.children;
  let current = 0;

  const update = () => {
    const containerWidth = carousel.offsetWidth;
    inner.style.transform = `translateX(-${current * containerWidth}px)`;
  };

  carousel.querySelector('.prev').addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    update();
  });

  carousel.querySelector('.next').addEventListener('click', () => {
    current = (current + 1) % items.length;
    update();
  });

  window.addEventListener('resize', update);
  update();
});

