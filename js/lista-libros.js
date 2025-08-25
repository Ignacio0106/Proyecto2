document.addEventListener("DOMContentLoaded", () => {
  // Mostrar todos los productos inicialmente
  displayBooks(tecnology);

  // Mostrar las categorías en el filtro
 displayCategorias();

    // Escuchar cambio en el filtro de categorías
    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", () => {
        const category = filterSelect.value.toLowerCase(); // Normalizamos a minúscula
        let filteredProducts;

        if (category === "all") {
            filteredProducts = tecnology;
        } else {
            filteredProducts = tecnology.filter(item => 
                item.categoria.toLowerCase() === category
            );
        }

        console.log("Categoría seleccionada:", category);
        console.log("Productos filtrados:", filteredProducts);

        // Mostrar los productos filtrados usando la misma función
        displayBooks(filteredProducts);
    });
});

function displayBooks(data){
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  
  data.forEach(book => {
    const col = document.createElement("div");
    col.className = "product-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-blue-600 hover:scale-105 transition-all duration-300";

    col.innerHTML = `
      <div class="relative overflow-hidden">
        <div data-carousel class="relative overflow-hidden">
          <div class="flex transition-transform duration-500 ease-in-out carousel-inner">
            <div class="flex-shrink-0 w-full p-3 text-center">
              <img src="${book.imagen}" class="mx-auto h-32 object-contain mb-2" alt="">
            </div>
            <div class="flex-shrink-0 w-full p-3 text-center">
              <img src="${book.imagen2}" class="mx-auto h-32 object-contain mb-2" alt="">
            </div>
          </div>
          <!-- Quité los onclick que llamaban a funciones inexistentes -->
          <button
            class="carousel-prev absolute top-1/2 left-1 -translate-y-1/2 bg-gray-300 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400 p-3 rounded-full shadow"
            type="button">
            &#10094;
          </button>
          <button
            class="carousel-next absolute top-1/2 right-1 -translate-y-1/2 bg-gray-300 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400 p-3 rounded-full shadow"
            type="button">
            &#10095;
          </button>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h5 class="text-lg font-bold text-center text-primary dark:text-blue-400 mb-2 line-clamp-2">
            ${book.nombre}
          </h5>
          <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-3 line-clamp-3 flex-grow">
            ${book.descripcion}
          </p>
            <h5 class="text-xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
              ¢${book.precio}
            </h5>
          <div class="flex gap-2 mt-auto">
            <button class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
                    onclick="comprarLibro(${book.id})">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13l1.5 5m0 0h8"/>
              </svg>
            </button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onclick="detalleProducto(${book.id})">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    bookList.appendChild(col);
  });

  // Inicializamos carruseles después de crear el contenido
  initCarousels();
}

// Nueva función para inicializar (evita correr antes de que existan los elementos)
function initCarousels() {
  document.querySelectorAll('[data-carousel]:not([data-initialized])').forEach(function(carousel) {
    carousel.setAttribute('data-initialized', 'true'); // evita re‑inicializar

    const inner = carousel.querySelector('.carousel-inner');
    if (!inner) return;

    const indicators = carousel.querySelectorAll('[data-slide]'); // si no hay, no pasa nada
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    let index = 0;
    const total = inner.children.length;

    function showSlide(i) {
      index = (i + total) % total;
      inner.style.transform = `translateX(-${index * 100}%)`;
      indicators.forEach((btn, idx) => {
        btn.classList.toggle('bg-white', idx === index);
        btn.classList.toggle('bg-white/50', idx !== index);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));
    indicators.forEach((btn, i) => btn.addEventListener('click', () => showSlide(i)));

    // Auto-slide
    const intervalId = setInterval(() => showSlide(index + 1), 4000);
    // (Opcional) limpiar si el carrusel sale del DOM: usar un observer si lo necesitas.

    showSlide(0);
  });
}

function detalleProducto(id) {
  window.location.href = `detalle-producto-servicio.html?id=${id}`;
}

function comprarLibro(id) {
  addToCart(id);

  // Encontrar el botón
  const btn = document.querySelector(`button[onclick="comprarLibro(${id})"]`);
  if (!btn) return;

  // Encontrar la tarjeta completa
  const card = btn.closest('.product-card');
  if (!card) return;

  // Reiniciar animación si se hace clic rápido varias veces
  card.classList.remove('fly-anim');
  // Forzar reflow para reiniciar la animación
  void card.offsetWidth;
  card.classList.add('fly-anim');
}

function displayCategorias() {
    const select = document.getElementById("filter");
    const categories = new Set();

    tecnology.forEach(item => categories.add(item.categoria));

    // Limpiar antes de añadir
    select.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = "Todas las categorías";
    select.appendChild(defaultOption);

    for (const category of categories) {
        const option = document.createElement("option");
        option.value = category.toLowerCase(); // Normalizamos a minúscula
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        select.appendChild(option);
    }
}