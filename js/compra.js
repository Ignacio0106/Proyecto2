
function saveCart(cartArray){
    localStorage.setItem("compra",JSON.stringify(cartArray))
    console.log("Carrito guardo: ", cartArray)
}
function getCart(){
    const cart=localStorage.getItem("compra")
    return cart ? JSON.parse(cart) : []
}
function addToCart(idLibro){
    //Obtener libro completo
    const book=tecnology.find((b)=> b.id == idLibro)
    //Objeto a guardar
    const carItem={
        id: book.id,
        name: book.nombre,
        price: book.precio,
        quantity: 1,
    } 
    let cartArray= getCart()
    //Buscar si el item existe en el carrito
    const indexItem=cartArray.findIndex((libro)=>libro.id === idLibro)

     if(indexItem !== -1){
        //Item existente
        cartArray[indexItem].quantity+=1
        toastr.info(`Cantidad de "${carItem.name}" actualiza a ${carItem.quantity}`,
            'Carrito Actualizado')
    }else{
        //Si el item no existe, lo agrega al carrito
        cartArray.push(carItem)
        toastr.success(
            `"${carItem.name}" agregado al carrito`,
            'Producto Agregado'
        )
    }
    
    saveCart(cartArray)
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