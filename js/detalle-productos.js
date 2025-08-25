document.addEventListener("DOMContentLoaded", () => {
  // Carrusel automático
  function startAutoPlay() {
    const carouselInner = document.getElementById("carousel-inner");
    if (!carouselInner) return;
    const slides = Array.from(carouselInner.children);
    let index = 0;
    setInterval(() => {
      index = (index + 1) % slides.length;
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
  }
  startAutoPlay();
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
  // Disponibilidad Online
  const onlineEl = document.getElementById("estadoDisponibilidadOnline");
  if(!product.disponibledOnline){
    onlineEl.classList.remove("bg-green-100", "text-green-700");
    onlineEl.classList.add("bg-red-100", "text-red-700");
    onlineEl.textContent = "No disponible";
  } else {
    onlineEl.classList.remove("bg-red-100", "text-red-700");
    onlineEl.classList.add("bg-green-100", "text-green-700");
    onlineEl.textContent = "Disponible";
  }
  // Disponibilidad Tienda
  const tiendaEl = document.getElementById("estadoDisponibilidadTienda");
  if(!product.disponibledTienda){
    tiendaEl.classList.remove("bg-green-100", "text-green-700");
    tiendaEl.classList.add("bg-red-100", "text-red-700");
    tiendaEl.textContent = "No disponible";
  } else {
    tiendaEl.classList.remove("bg-red-100", "text-red-700");
    tiendaEl.classList.add("bg-green-100", "text-green-700");
    tiendaEl.textContent = "Disponible";
  }
  // Cargar imágenes en el carrusel
  const imagenes = [product.imagen, product.imagen2].filter(Boolean);
  const carouselInner = document.getElementById("carousel-inner");
  if (carouselInner) {
    carouselInner.innerHTML = "";
    imagenes.forEach((imgSrc, index) => {
      const div = document.createElement("div");
      div.className = "w-full flex-shrink-0 relative overflow-hidden";
      div.innerHTML = `<img src="${imgSrc}" class="h-40 md:h-96 object-cover mx-auto overflow-hidden" alt="${product.nombre}" onerror="this.src='img/image-not-found.jpg';" />`;
      carouselInner.appendChild(div);
    });
  }
});

function mostrarError() {
  // Oculta la sección de detalles y muestra una alerta de producto no encontrado
  document.getElementById("detalle").classList.add("d-none");
  document.getElementById("alertNotFound").classList.remove("d-none");
}

