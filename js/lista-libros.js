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
     const col=document.createElement("div") 
     col.className = "col-md-4 mb-4";

    const carouselId = `carouselProduct${book.id}`;
    const images = [book.imagen, book.imagen2].filter(Boolean);

    // No se generan indicadores para no mostrar números

    // Construir items del carrusel
    const innerItems = images.map((src, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${src}" class="d-block w-100 img-thumbnail"
          style="max-height: 200px; object-fit: contain;"
          alt="${book.nombre}"
          onerror="this.src='img/image-not-found.jpg';" />
      </div>
    `).join("");

    col.innerHTML = `
      <div class="card h-100 d-flex flex-column shadow-sm">
        <div id="${carouselId}" class="carousel slide">
          <div class="carousel-inner">
            ${innerItems}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="custom-arrow" aria-hidden="true">&#11164;</span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="custom-arrow" aria-hidden="true">&#11166;</span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center libro-name fw-bold fs-4 text-primary mb-2" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
      ${book.nombre}
    </h5>

    <!-- Descripción -->
    <p class="card-text text-center text-secondary mb-3" style="font-size: 0.95rem;">
      ${book.descripcion}
    </p>

    <!-- Precio -->
    <h5 class="card-text text-center text-success fw-bold mb-0 fs-5">
      &cent;${book.precio}
    </h5>
        <div class="input-group mb-3 mt-8">
            <span class="input-group-text">Cantidad</span>
            <input type="number" class="form-control libro-quantity" value="1" min="1">
          </div>
        <div class="mt-auto d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-success" onclick="comprarLibro(${book.id})">
            <i class="bi bi-cart-plus"></i>
          </button>
          <button class="btn btn-primary" onclick="detalleProducto(${book.id})">
              <i class="bi bi-three-dots"></i>
            </button>
        </div>
      </div>
    </div>`
      bookList.appendChild(col)
  });
}

/*
highlight: resalta el fondo brevemente.
pulsate: hace parpadear el elemento.
shake: sacude el elemento.
scale: agranda o reduce temporalmente.
*/

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