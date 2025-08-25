// Carrusel simple: solo cambia imágenes automáticamente
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
  const list = document.getElementById('book-list');
  if(!list) return;
  list.innerHTML = '';

  data.forEach(b => {
    const imgs = [b.imagen, b.imagen2].filter(Boolean);
    const id = 'c'+b.id;
    const el = document.createElement('div');
    el.className = 'w-full p-3';

    el.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full">
        <div class="relative overflow-hidden h-48 bg-white dark:bg-gray-900">
          <div id="${id}" class="flex w-full h-full transition-transform duration-700 ease-out">
            ${imgs.map(src=>`
              <img src="${src}" onerror="this.src='img/image-not-found.jpg';"
                   class="w-full h-48 object-contain flex-shrink-0"
                   alt="${b.nombre}">
            `).join('')}
          </div>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h5 class="text-lg font-bold text-center text-primary dark:text-blue-400 mb-2 line-clamp-2">${b.nombre}</h5>
          <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-3 line-clamp-3 flex-grow">${b.descripcion}</p>
            <h5 class="text-xl font-bold text-center text-green-600 dark:text-green-400 mb-4">¢${b.precio}</h5>
          <div class="flex gap-2 mt-auto">
            <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                    onclick="comprarLibro(${b.id})">Comprar</button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg"
                    onclick="detalleProducto(${b.id})">Ver</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(el);

    if (imgs.length > 1){
      let i = 0;
      const track = el.querySelector('#'+id);
      setInterval(()=>{
        i = (i + 1) % imgs.length;
        track.style.transform = `translateX(-${i * 100}%)`;
      },3000);
    }
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