document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el parámetro "id" de la URL para identificar qué producto mostrar
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  // Si no hay id, muestra un error y detiene la ejecución
  if (!idParam) {
    mostrarError();
    return;
  }

  // Busca el producto en el arreglo "tecnology" con el id correspondiente
  const product = tecnology.find(p => p.id == idParam);
  if (!product) {
    mostrarError();
    return;
  }

  // Muestra la información del producto en el HTML
  document.getElementById("nombre").textContent = product.nombre;
  document.getElementById("descripcion").textContent = product.descripcion;
  document.getElementById("precio").textContent = "₡" + product.precio.toLocaleString();
  document.getElementById("tiempoEntrega").textContent = product.tiempoEntrega || "No disponible";
  document.getElementById("costoEnvio").textContent = product.costoEnvio === 0 ? "Gratis" : "₡" + product.costoEnvio;
  document.getElementById("categoria").textContent = product.categoria || "Sin categoría";
  if(!product.disponibledOnline){
    document.getElementById("estadoDisponibilidadOnline").classList.replace("bg-green-100", "bg-red-100");
        document.getElementById("estadoDisponibilidadOnline").classList.replace("text-green-700", "text-red-700");
  }
  document.getElementById("estadoDisponibilidadOnline").textContent = product.disponibledOnline ? "Disponible" : "No disponible";
  if(product.disponibledTienda){
    document.getElementById("estadoDisponibilidadTienda").classList.replace("bg-red-100 text-red-700", "bg-green-100 text-green-700");
  }
  document.getElementById("estadoDisponibilidadTienda").textContent = product.disponibledTienda ? "Disponible" : "No disponible";
  // Crea el carrusel de imágenes para el producto
  const carousel = document.getElementById("imagenesCarousel");
  carousel.innerHTML = "";
  const imagenes = [product.imagen, product.imagen2].filter(Boolean); // Solo imágenes válidas

  imagenes.forEach((imgSrc, index) => {
    const div = document.createElement("div");
    div.className = "carousel-item" + (index === 0 ? " active" : "");
    div.innerHTML = `<img src="${imgSrc}" class="d-block w-100 img-thumbnail" alt="${product.nombre}" onerror="this.src='img/image-not-found.jpg';" />`;
    carousel.appendChild(div);
  });

  // Botón comprar muestra un alert con el producto agregado
  document.getElementById("btnComprar").addEventListener("click", () => {
    alert("Producto agregado al carrito: " + product.nombre);
  });
});

function mostrarError() {
  // Oculta la sección de detalles y muestra una alerta de producto no encontrado
  document.getElementById("detalle").classList.add("d-none");
  document.getElementById("alertNotFound").classList.remove("d-none");
}


// Apartado de Reseñas
document.addEventListener("DOMContentLoaded", () => {
  // Obtener id del producto de la URL
  const idParam = new URLSearchParams(window.location.search).get("id");
  const lista = document.getElementById("listaResenas");        // Contenedor reseñas
  const estrellasEl = document.getElementById("estrellasPromedio"); // Estrellas promedio
  const totalEl = document.getElementById("totalResenas");       // Total reseñas

  let calificacionSeleccionada = 0;
  const estrellasFormulario = document.querySelectorAll("#ratingStars .star"); // Estrellas para elegir

  // Manejar hover y selección de estrellas
  estrellasFormulario.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      estrellasFormulario.forEach((s, i) => s.classList.toggle("hovered", i <= index));
    });

    star.addEventListener("mouseout", () => {
      estrellasFormulario.forEach(s => s.classList.remove("hovered"));
    });

    star.addEventListener("click", () => {
      calificacionSeleccionada = index + 1;
      estrellasFormulario.forEach((s, i) => s.classList.toggle("selected", i < calificacionSeleccionada));
    });
  });

  // Función para mostrar estrellas llenas o vacías según valor
  function renderEstrellas(valor) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="me-1">${i <= valor ? "★" : "☆"}</span>`;
    }
    return html;
  }

  // Cargar y mostrar reseñas guardadas en localStorage
  function cargarResenas() {
    const resenas = JSON.parse(localStorage.getItem(`resenas_${idParam}`)) || [];
    lista.innerHTML = "";
    let suma = 0;

    // Crear tarjeta para cada reseña
    resenas.forEach(r => {
      suma += r.calificacion;
      const item = document.createElement("div");
      item.className = "card mb-3 shadow-sm border-0";
      item.innerHTML = `
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0 text-primary"><i class="bi bi-person-circle me-1"></i> ${r.usuario}</h6>
            <div class="text-warning fs-6">${renderEstrellas(r.calificacion)}</div>
          </div>
          <p class="mb-0 text-secondary">${r.comentario}</p>
        </div>
      `;
      lista.appendChild(item);
    });

    // Calcular y mostrar promedio de estrellas y total de reseñas
    const promedio = resenas.length ? (suma / resenas.length).toFixed(1) : 0;
    estrellasEl.innerHTML = renderEstrellas(Math.round(promedio));
    totalEl.textContent = resenas.length;
  }

  // Manejar el envío del formulario de reseña
  document.getElementById("formResena").addEventListener("submit", e => {
    e.preventDefault();

    // Obtener datos del formulario
    const usuario = document.getElementById("usuario").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    // Validar que se haya seleccionado calificación, nombre y comentario
    if (!usuario || !comentario || calificacionSeleccionada === 0) return;

    // Crear nueva reseña
    const nueva = {
      usuario,
      comentario,
      calificacion: calificacionSeleccionada
    };

    // Guardar en localStorage y actualizar lista
    const resenas = JSON.parse(localStorage.getItem(`resenas_${idParam}`)) || [];
    resenas.push(nueva);
    localStorage.setItem(`resenas_${idParam}`, JSON.stringify(resenas));

    // Limpiar formulario y resetear estrellas
    e.target.reset();
    calificacionSeleccionada = 0;
    estrellasFormulario.forEach(s => s.classList.remove("selected"));

    // Recargar reseñas para mostrar la nueva
    cargarResenas();
  });

  // Cargar reseñas al cargar la página
  cargarResenas();
});
