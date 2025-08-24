document.addEventListener("DOMContentLoaded", ()=> {
    displayProductos(tecnology);
    displayCategorias();

    const filtro = document.getElementById("filter");
    filtro.addEventListener("change", () => {
        const categoriaSeleccionada = filtro.value;
        const productosFiltrados = categoriaSeleccionada === "all"
            ? tecnology
            : tecnology.filter(producto => producto.categoria === categoriaSeleccionada);
        displayProductos(productosFiltrados);
    });
});

function displayProductos(data){
    const lista = document.getElementById("product-list");
    lista.innerHTML = ""; // Limpiar lista existente

    data.forEach(producto => {
        const item = document.createElement("div");
        item.innerHTML = `
       <div class="p-4 border border-gray-200 rounded">
        <img src="${producto.imagen}" alt="${producto.titulo}" class="w-full h-auto">
        <h2 class="text-xl font-bold">${producto.titulo}</h2>
        <p class="text-gray-600">${producto.descripcion}</p>
        <p class="text-lg font-semibold">$${producto.precio}</p>
        <button class="btn btn-primary">Agregar al carrito</button>
       </div>
        `;
        lista.appendChild(item);
    });
}

function displayCategorias(){
    const lista = document.getElementById("filter");

    const categorias = new Set();

    tecnology.forEach(producto => {
        categorias.add(producto.categoria);
    });

    for(let categoria of categorias){
        const item = document.createElement("option");
        item.innerHTML = `
        <option value="${categoria}">${categoria}</option>
        `;
        lista.appendChild(item);
    }
}
