document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    mostrarResenas(id);
    document.getElementById("btnEnviarForm").addEventListener("click", () => {guardarResena(id);
    });
    document.getElementById("btnCancelar").addEventListener("click", () => {
        window.resetStarRating();
    });
});

function guardarResena(id) {
    const nombre = document.getElementById("reviewName").value;
    const comentario = document.getElementById("reviewText").value;
    const calificacion = 4;

    if (!nombre || !comentario || !calificacion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevaResena = {
        nombre,
        comentario,
        calificacion
    };

    const reseñas = JSON.parse(localStorage.getItem(`reseñas_${id}`)) || [];
    reseñas.push(nuevaResena);
    localStorage.setItem(`reseñas_${id}`, JSON.stringify(reseñas));

    document.getElementById("form-resena").reset();
    mostrarResenas(id);
}

function mostrarResenas(id) {
    const reseñas = JSON.parse(localStorage.getItem(`reseñas_${id}`)) || [];
    const contenedor = document.getElementById("lista-resenas");
    contenedor.innerHTML = "";

    reseñas.forEach((resena, index) => {
        const divResena = document.createElement("div");
        divResena.classList.add("flex", "flex-col", "sm:flex-row", "sm:items-center", "gap-4");
        divResena.innerHTML = `
                <div class="flex-shrink-0">
                    <span id="inicialU" class="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center text-gray-500">${resena.nombre.charAt(0)}</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                        <h4 id="nombreU" class="text-lg font-semibold text-gray-800">${resena.nombre}</h4>
                        <span id="estrellasU" class="text-yellow-500">${"★".repeat(resena.calificacion)}${"☆".repeat(5 - resena.calificacion)}</span>
                    </div>
                    <p id="resenaU" class="text-gray-700">${resena.comentario}</p>
                </div>
        `;
        contenedor.appendChild(divResena);
    });
}