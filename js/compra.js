function saveCart(cartArray){
    localStorage.setItem("compra", JSON.stringify(cartArray))
    console.log("Carrito guardado: ", cartArray)
}

function addToCart(idLibro){
    //Obtener libro completo
    const book=books.find((b)=>b._id == idLibro)
    //Onjeto a guardar
    const carItem={
        id:book._id,
        name: book.title,
        price: book.price,
        quantity: 1
    }
}