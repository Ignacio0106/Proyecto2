const carousels = {
    1: { el: document.getElementById('carousel1'), index: 0 },
    2: { el: document.getElementById('carousel2'), index: 0 },
    3: { el: document.getElementById('carousel3'), index: 0 },
    main: { el: document.getElementById('carousel-inner'), index: 0 } // tu nuevo carrusel
  };

  function showSlide(c, i) {
    const carousel = carousels[c];
    const slides = carousel.el.children;
    const total = slides.length;
    carousel.index = (i + total) % total; // ciclo infinito
    carousel.el.style.transform = `translateX(-${carousel.index * 100}%)`;

    // Actualizar indicadores si existen
    const indicators = carousel.el.parentElement.querySelectorAll('[data-slide]');
    indicators.forEach((btn, idx) => {
      btn.classList.toggle('bg-white', idx !== carousel.index);
      btn.classList.toggle('bg-blue-500', idx === carousel.index);
    });
  }

  function prevSlide(c) { showSlide(c, carousels[c].index - 1); }
  function nextSlide(c) { showSlide(c, carousels[c].index + 1); }

  // Controles para el carrusel principal
  document.getElementById('prev').addEventListener('click', () => prevSlide('main'));
  document.getElementById('next').addEventListener('click', () => nextSlide('main'));

  // Indicadores clicables
  document.querySelectorAll('#carousel-inner ~ div [data-slide]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.getAttribute('data-slide'));
      showSlide('main', i);
    });
  });

  