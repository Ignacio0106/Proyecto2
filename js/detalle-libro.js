document.addEventListener("DOMContentLoaded",()=>{
    //Obtener los parametros
    const urlParams= new URLSearchParams(window.location.search)
    //Obtener el parámetro id
    const idParam=urlParams.get("id")
    console.log("Libro",idParam)
    if(!idParam){
        //Producto no encontrado
        libroNoEncontrado()
        return
    }
    //Obtener el producto
    const book=books.find((b)=>b._id == idParam)

    if(!book){
        //Libro no encontrado
        libroNoEncontrado()
        return
    }
    console.log("Libro encontrado",book)
    //Mostrar el Libro en el HTML
    document.getElementById("title").textContent=book.title
    document.getElementById("price").textContent="₡"+book.price
    document.getElementById("isbn").textContent=book.isbn || "Sin ISBN"
    document.getElementById("longDescription").textContent=book.longDescription
        || "Sin Descripcion"
    //Autores
    document.getElementById("authors").textContent=book.authors?.join(", ") || "Sin autores"
    //Categorías badges
    const categoriesContainer=document.getElementById("categories")
    categoriesContainer.innerHTML=""
    if(book.categories?.length > 0){
        book.categories.forEach((cat)=>{
            const badge=document.createElement("span")
            badge.className="badge bg-primary"
            badge.textContent=cat
            categoriesContainer.appendChild(badge)
        })
    }else{
        categoriesContainer.textContent="Sin categorías"
    }
    //Imagen
    const img=document.getElementById("image")
    if(book.thumbnailUrl){
        img.src=book.thumbnailUrl
        img.alt=book.title
    }

})
function libroNoEncontrado(){
    //display:none d-none
    document.getElementById("detalle").classList.add("d-none")
    document.getElementById("alertNotFound").classList.remove("d-none")
}