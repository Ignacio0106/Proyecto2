// Funciones de carrito
function saveCart(cartArray) {
    localStorage.setItem("compra", JSON.stringify(cartArray));
    console.log("Carrito guardado: ", cartArray);
}

function getCart() {
    const cart = localStorage.getItem("compra");
    return cart ? JSON.parse(cart) : [];
}

function addToCart(idLibro) {
    // Obtener libro completo
    const book = tecnology.find(b => b.id == idLibro);
    if (!book) return;

    // Objeto a guardar
    const cartItem = {
        id: book.id,
        name: book.nombre,
        price: book.precio,
        quantity: 1
    };

    let cartArray = getCart();

    // Verificar si ya existe
    const indexItem = cartArray.findIndex(item => item.id === idLibro);

    if (indexItem !== -1) {
        cartArray[indexItem].quantity += 1;

        toastr.info(
            `Cantidad de "${cartArray[indexItem].name}" actualizada a ${cartArray[indexItem].quantity}`,
            'Carrito Actualizado'
        );
    } else {
        cartArray.push(cartItem);

        toastr.success(
            `"${cartItem.name}" agregado al carrito`,
            'Producto Agregado'
        );
    }

    saveCart(cartArray);
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }