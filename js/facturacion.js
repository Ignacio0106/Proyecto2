// ===============================
// Formatear fecha de expiración MM/AA
// ===============================
function formatearFechaExpiracion(input) {
    let value = input.value.replace(/\D/g, ''); // Solo números

    if (value.length <= 2) {
        // Solo el mes
        input.value = value;
    } else if (value.length <= 4) {
        // Formato MM/AA
        input.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        // Formato MM/AAAA
        input.value = value.slice(0, 2) + '/' + value.slice(2, 6);
    }
}

// Escuchar cambios en el input
document.getElementById('fechaExpiracion').addEventListener('input', function() {
    formatearFechaExpiracion(this);
});


// ===============================
// Funciones de carrito
// ===============================
function saveCart(cartArray) {
    localStorage.setItem("compra", JSON.stringify(cartArray));
}

function getCart() {
    const cart = localStorage.getItem("compra");
    return cart ? JSON.parse(cart) : [];
}

// ===============================
// Actualizar resumen de compra
// ===============================
function actualizarResumen() {
    const cartArray = getCart();
    let subtotalTotal = 0;

    cartArray.forEach(item => {
        subtotalTotal += item.price * item.quantity;
    });

    const envioSeleccionado = document.querySelector('input[name="shipping"]:checked')?.value || 'store';
    let costoenvioCombo = 0;
    let costoEnvio = 0;
    if(cartArray.length > 0){
            cartArray.forEach(item => {
            costoenvioCombo += parseInt(item.costoEnvio);
        });
    }
    if(envioSeleccionado === 'postal' && cartArray.length > 0){
        cartArray.forEach(item => {
            costoEnvio += parseInt(item.costoEnvio);
        });
    }
    document.getElementById('costo-envio').textContent = `₡${costoenvioCombo}`;

    // Actualiza subtotal y total
    document.getElementById('total-compra').textContent = `₡${(subtotalTotal + costoEnvio).toLocaleString()}`;
    document.getElementById('total-items').textContent = `Subtotal (${cartArray.length} productos)`;

    // Actualiza envío visible
    document.getElementById('resumen-envio').textContent = costoEnvio === 0 ? 'Gratis' : `₡${costoEnvio}`;
}


document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', actualizarResumen);
});

document.addEventListener('DOMContentLoaded', actualizarResumen);

// ===============================
// Proceder al pago
// ===============================
document.getElementById('btnProcederPago').addEventListener('click', function() {
    document.getElementById('mediosPago').classList.remove('hidden');
    document.getElementById('compra').classList.add('hidden');
});

// ===============================
// Procesar pago
// ===============================
document.getElementById('realizarPago').addEventListener('click', function() {
    const numeroTarjeta = document.getElementById('numeroTarjeta').value.replace(/\s+/g, '');
    const fechaExpiracion = document.getElementById('fechaExpiracion').value;
    const cvv = document.getElementById('cvv').value;
    const datosTitular = document.getElementById('datosTitular').value.trim();
    const medioPago = "Tarjeta";

    // Validaciones
    const numeroTarjetaRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;
    const nombreTitularRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\-]{2,60}$/;

    if (!numeroTarjetaRegex.test(numeroTarjeta)) {
        alert('Por favor, ingrese un número de tarjeta válido de 16 dígitos.');
        return;
    }

    const [mes, anio] = fechaExpiracion.split('/');
    if (!mes || !anio || parseInt(mes) < 1 || parseInt(mes) > 12) {
        alert('Por favor, ingrese una fecha de expiración válida en formato MM/AA.');
        return;
    }
    let anio4 = anio.length === 2 ? '20' + anio : anio;
    const hoy = new Date();
    const fechaExp = new Date(parseInt(anio4), parseInt(mes) - 1, 1);
    const primerDiaSiguienteMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
    if (fechaExp < primerDiaSiguienteMes) {
        alert('La tarjeta está vencida. Por favor ingrese una fecha válida.');
        return;
    }

    if (!cvvRegex.test(cvv)) {
        alert('Por favor, ingrese un CVV válido de 3 o 4 dígitos.');
        return;
    }

    if (!nombreTitularRegex.test(datosTitular)) {
        alert('Por favor, ingrese un nombre del titular válido.');
        return;
    }

    toastr.success("Pago procesado correctamente", 'Éxito');

    document.getElementById('paymentForm').reset();
    mostrarFactura(medioPago, datosTitular);
    document.getElementById('mediosPago').classList.add('hidden');
    document.getElementById('factura').classList.remove('hidden');

    // ✅ Vaciar carrito después del pago
    saveCart([]);
    actualizarResumen();
});


// ===============================
// Generar factura
// ===============================
function mostrarFactura(medioPago, nombreTitular) {
    const facturaEl = document.getElementById('factura');
    facturaEl.innerHTML = `
        <div class="max-w-4xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div class="flex items-center">
            <a class="text-gray-600" href="index.html">Inicio</a>
            <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                    <a class="text-gray-600" href="facturacion.html">Facturación</a>
            <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
            <span id="categoria" class="text-gray-800 font-medium truncate max-w-xs sm:max-w-none">Factura</span>
            </div>
            <h2 class="text-3xl font-bold mb-6 text-center dark:text-white">Listado de productos adquiridos</h2>
            
            <div class="mt-2 text-center">
                <p class="text-2xl font-semibold dark:text-white mb-1">Titular de la tarjeta: <span id="factura-titular">${nombreTitular}</span></p>
                <p class="text-xl font-semibold dark:text-white">Medio de pago: <span id="factura-medioPago">${medioPago}</span></p>
            </div>

            <table class="w-full text-left border-collapse dark:text-white mt-6">
                <thead>
                    <tr class="border-b border-gray-300 dark:border-gray-600">
                        <th class="p-3">Producto</th>
                        <th class="p-3 text-center">Cantidad</th>
                        <th class="p-3 text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody id="factura-body"></tbody>
            </table>

            <div class="mt-6 flex justify-between text-lg dark:text-white">
                <span>Envío</span>
                <span id="factura-envio"></span>
            </div>
            <div class="mt-2 flex justify-between text-xl font-bold dark:text-white">
                <span>Total de la compra</span>
                <span id="factura-total"></span>
            </div>
        </.div>
    `;

    const cartArray = getCart();
    let subtotalTotal = 0;

    const facturaBody = document.getElementById('factura-body');
    cartArray.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotalTotal += itemSubtotal;
        facturaBody.innerHTML += `
            <tr class="border-b border-gray-200 dark:border-gray-600">
                <td class="p-3">${item.name}</td>
                <td class="p-3 text-center">${item.quantity}</td>
                <td class="p-3 text-right">₡${itemSubtotal.toLocaleString()}</td>
            </tr>
        `;
    });

    const envioSeleccionado = document.querySelector('input[name="shipping"]:checked')?.value || 'store';

    const total = subtotalTotal + costoEnvio;
    let costoEnvio = 0;
    if(envioSeleccionado === 'postal' && cartArray.length > 0){
        cartArray.forEach(item => {
            costoEnvio += parseInt(item.costoEnvio);
        });
    }
    document.getElementById('factura-envio').textContent = costoEnvio === 0 ? 'Gratis' : `₡${costoEnvio.toLocaleString()}`;

    document.getElementById('factura-total').textContent = `₡${total.toLocaleString()}`;
    facturaEl.classList.remove('hidden');
}
