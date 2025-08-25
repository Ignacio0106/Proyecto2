document.addEventListener('DOMContentLoaded', showDetail);
function showDetail(){
    //Línea de compra HTML
    let cartRowHTML=''
    let itemCount=0
    let total=0
    //Obtengo los items guardados
    const cart=getCart()
    if(cart.length >0){
        itemCount=cart.length
        cart.forEach(item => {
            const price =parseFloat(item.price) || 0
            const quantity =parseFloat(item.quantity) || 0
            const subtotal= price * quantity
            cartRowHTML +=`<div class="grid grid-cols-5 gap-4 p-4 border-b border-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors items-center">
                <div class="text-center">${item.name}</div>
                <div class="text-center">
                    <input type="number" min="0" value="${item.quantity}" 
                        class="w-16 text-center border border-gray-300 dark:border-gray-600 rounded-md p-1 dark:bg-gray-700 dark:text-white"
                        data-id="${item.id}" onchange="updateCartItemQty(this)">
                </div>
                <div class="text-center">${item.price.toFixed(0)}</div>
                <div class="text-center">${subtotal.toFixed(0)}</div>
                <div class="flex justify-center items-center">
                <button onclick="eliminarItem(${item.id})" class="flex justify-center items-center text-red-600 hover:bg-red-200 hover:scale-110 transition-transform duration-200 ease-in-out rounded-2xl size-10"><svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
            </div>
            </div>`
            total +=subtotal
        });
    }
    document.getElementById("detail").innerHTML=cartRowHTML
    document.getElementById("total-items").textContent=`Total items: ${itemCount}`
    document.getElementById("total-compra").textContent="₡"+total.toFixed(0)
}
function eliminarItem(idLibro){
    let cartArray=getCart()
    if(cartArray.length >0){
        cartArray=cartArray.filter((item)=> item.id !== idLibro)
        toastr.warning("Producto eliminado","Compra")
    }else{
        toastr.info("Seleccione productos a comprar","Compra")
    }
    saveCart(cartArray)
    showDetail()
    
}
/**
 * Actualiza la cantidad de un item en el carrito.
 * @param {HTMLElement} element El input de cantidad que desencadenó el evento.
 */
function updateCartItemQty(element) {
  const idLibro = element.dataset.id;
  const newQuantity = parseInt(element.value, 10);
  if (isNaN(newQuantity)) {
    toastr.error("La cantidad no es un número válido.", "Error de Entrada");
    showDetail(); // Recargar para mostrar la cantidad correcta si el usuario borra todo
    return;
  }

  let cartArray = getCart();
  const itemIndex = cartArray.findIndex((obj) => obj.id == idLibro);

  if (itemIndex !== -1) {
    if (newQuantity < 0 || newQuantity == 0) {
      if (confirm("¿Estás seguro de que deseas eliminar este artículo del carrito?")) {
        eliminarItem(cartArray[itemIndex].id);
      } else{
        element.value = cartArray[itemIndex].quantity; // Restaura la cantidad anterior
      }
    } else {
      // Actualizar la cantidad y guardar
      cartArray[itemIndex].quantity = newQuantity;
      saveCart(cartArray);
      showDetail();
      toastr.success(
        `Cantidad de "${cartArray[itemIndex].name}" actualizada a ${newQuantity}.`,
        "Cantidad Actualizada"
      );
    }
  } else {
    toastr.error("El producto no se encontró en el carrito.", "Error");
    showDetail();
  }
}