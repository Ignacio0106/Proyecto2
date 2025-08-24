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
  //Div de lista de libros
  const bookList=document.getElementById("book-list")
  //Limpiar el contenido de la lista
  bookList.innerHTML=""
  
  data.forEach(book => {
  const col = document.createElement("div");
  col.className = "w-full p-3";

  const carouselId = `carouselProduct${book.id}`;
  const images = [book.imagen, book.imagen2].filter(Boolean);

  // Construir items del carrusel
const innerItems = images.map((src, i) => `
    <div class="carousel-slide ${i === 0 ? 'active' : 'hidden'} transition-opacity duration-500" data-slide="${i}">
      <img src="${src}" 
           class="w-full h-48 object-contain rounded-t-xl"
           alt="${book.nombre}"
           onerror="this.src='img/image-not-found.jpg';" />
    </div>
  `).join("");

  col.innerHTML = `
    <div class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">

      <!-- Carrusel de imágenes -->
      <div id="${carouselId}" class="relative overflow-hidden">
        <div class="carousel-container relative">
          ${innerItems}
        </div>
      </div>
      
      <!-- Contenido de la tarjeta -->
      <div class="p-4 flex flex-col flex-grow">
        <!-- Título -->
        <h5 class="text-lg font-bold text-center text-primary dark:text-blue-400 mb-2 group-hover:text-warning transition-colors duration-300 line-clamp-2">
          ${book.nombre}
        </h5>

        <!-- Descripción -->
        <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-3 line-clamp-3 flex-grow">
          ${book.descripcion}
        </p>

        <!-- Precio -->
        <h5 class="text-xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
          ¢${book.precio}
        </h5>

        <!-- Botones de acción -->
        <div class="flex gap-2 mt-auto">
          <button class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
                  onclick="comprarLibro(${book.id})">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13l1.5 5m0 0h8"/>
            </svg>
          </button>
          <button class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onclick="detalleProducto(${book.id})">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
      bookList.appendChild(col)
      
  });
}

function detalleProducto(id) {
  window.location.href = `detalle-producto-servicio.html?id=${id}`;
}

function comprarLibro(element) {
addToCart(element);
const $card = $(`.libro-item button[onclick="comprarLibro(${element})"]`).closest(".libro-item")
const $title = $card.find('.libro-name');

console.log("Producto: ",$title)
/*   $card.animate({
  color: "white",
  backgroundColor: "rgba(190, 190, 190, 1)"
}); */
//$card.toggle( "bounce", { times: 2 }, "slow" );
//$card.toggle( "blind" );
//$card.toggle( "clip" );

// Ocultar el título con efecto drop
$title.toggle("drop", { direction: "up" }, 500);
// Volver a mostrar el título después de 1.2 segundos
setTimeout(() => {
  $title.show("drop", { direction: "down" }, 400);
}, 1200);
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