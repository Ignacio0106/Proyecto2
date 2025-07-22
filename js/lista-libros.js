document.addEventListener("DOMContentLoaded", () => {
  // Mostrar todos los productos inicialmente
  displayProducts(tecnology);

  // Mostrar las categorías en el filtro
  displayCategorias();

  // Escuchar cambio en el filtro de categorías
  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", () => {
      const category = filterSelect.value;
      let filteredProducts;

      // Si la categoría es "all", mostrar todos, si no, filtrar por categoría
      if (category === "all") {
          filteredProducts = tecnology;
      } else {
          filteredProducts = tecnology.filter(item => item.categoria === category);
      }

      // Mostrar los productos filtrados
      displayProducts(filteredProducts);
  });
});

function displayProducts(data) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  data.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const carouselId = `carouselProduct${product.id}`;
    const images = [product.imagen, product.imagen2].filter(Boolean);

    // No se generan indicadores para no mostrar números

    // Construir items del carrusel
    const innerItems = images.map((src, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${src}" class="d-block w-100 img-thumbnail"
          style="max-height: 200px; object-fit: contain;"
          alt="${product.nombre}"
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
          <h5 class="card-title text-center">${product.nombre}</h5>
          <p class="card-text text-center">${product.descripcion}</p>
          <h5 class="card-text text-info text-center fw-bold mb-0">&cent;${product.precio}</h5>
          <div class="input-group my-3">
            <span class="input-group-text">Cantidad</span>
            <input type="number" class="form-control" value="1" min="1">
          </div>
          <div class="mt-auto d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-success" onclick="comprarProducto(${product.id})">
              <i class="bi bi-cart-plus"></i>
            </button>
            <button class="btn btn-primary" onclick="detalleProducto(${product.id})">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    productList.appendChild(col);
  });
}


function detalleProducto(id) {
  window.location.href = `detalle-producto.html?id=${id}`;
}

function comprarProducto(id) {
  alert("Producto agregado al carrito: " + id);
}

function displayCategorias() {
  const select = document.getElementById("filter");
  const categories = new Set();

  tecnology.forEach(item => {
      categories.add(item.categoria);
  });

  // Limpiar antes de añadir
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Todas las categorías";
  select.appendChild(defaultOption);

  for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      select.appendChild(option);
  }
}
