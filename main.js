const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.querySelector(".cart-content");


const mostrarProductos = (data) =>{
    data.forEach(producto =>{
        const cardProducto = document.createElement("div");
        cardProducto.classList.add("productos");
        cardProducto.innerHTML =`
                                <h3 class="card-title px-4 pt-4">${producto?.nombre}</h3>
                                <img src="${producto?.img}" class="product-img" alt="${producto?.nombre}">
                                <div class="card-body">
                                    <p class="card-text pt-4">${producto?.descripcion}</p>
                                </div>
                                <p class="precio">$${producto?.precio}</p>
                                <button id="${producto?.id} "class="button">Agregar</button>
                                `
        contenedorProductos.append(cardProducto);                        
    })
    const agregarCarrito = document.querySelectorAll(".button");
    agregarCarrito.forEach(el =>{
        el.addEventListener("click", (e)=>{
            agregarClick(e.target.id)
        });
    })
}

mostrarProductos(productos);


let carrito = [];

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        renderCarrito();
    }
})


function agregarClick(id){

    const existe = carrito.some(prod => prod.id === parseInt(id))
    if(existe){
        alert("Ya añadiste este producto al carrito");
        return;
    }

    let prodEncontrado = productos.find( prod => prod.id === parseInt(id));
    carrito.push(prodEncontrado);
    renderCarrito()
    console.log(carrito);

    let contador = document.getElementById("span-carrito");
    contador.innerText = carrito.length;
    
    
}

function renderCarrito(){
    contenedorCarrito.innerHTML = "";
    carrito.map(item=>{
        const div = document.createElement("div");
        div.classList.add("cart-box");
        const Content = `
                        <img src="${item.img}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${item.nombre}</div>
                            <div class="cart-price">$${item.precio}</div>
                            
                        </div>
                        <ion-icon name="trash-outline" class="cart-remove"></ion-icon> 
                        `
        div.innerHTML = Content;
        contenedorCarrito.append(div);
        

        
        /* div.querySelector(".cart-quantity").addEventListener("change", contadorChanged) */
        let contador = document.getElementById("span-carrito");
        contador.innerText = carrito.length;
        
        localStorage.setItem("carrito", JSON.stringify(carrito))
        div.querySelector(".cart-remove").addEventListener("click", borrarProductos)
    })
    actualizarTotal()
}


function actualizarTotal(){
    let total = 0;
    carrito.forEach(item=>{
        /* let contadorProducto = document.getElementsByClassName("cart-quantity")[0]; */
        let price = parseInt(item.precio.toString().replace("$", ""));
        /* let contador = contadorProducto.value; */
        total = total + price;
    })
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

function borrarProductos(e){
    
    const buttonDelete = e.target;
            const caja = buttonDelete.closest(".cart-box");
            const title = caja.querySelector(".cart-product-title").textContent;
            for(let i = 0; i < carrito.length; i++){
                if(carrito[i].nombre === title){
                    carrito.splice(i, 1)
                    localStorage.setItem("carrito",JSON.stringify(carrito));
                }
            }
            caja.remove()
            let contador = document.getElementById("span-carrito");
            contador.innerText = carrito.length;
           
            actualizarTotal()
            
}


/* function contadorChanged(e){
    let input = e.target;
    actualizarTotal();
} */

/* function addLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem("carrito"));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
} */







/* if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready(){
    let borrarBotones = document.getElementsByClassName("cart-remove")
    for(botones of borrarBotones){
        let button = botones;
        button.addEventListener("click", borrarProducto);
    }
    let contadorInputs = document.getElementsByClassName("cart-quantity");
    for(contador of contadorInputs){
        let input = contador;
        input.addEventListener("change", contadorChanged);
    }
    // Agregar al carrito
    let agregarCarrito = document.getElementsByClassName("button");
    for(agregar of agregarCarrito){
        let boton = agregar;
        boton.addEventListener("click", agregarClick);
    }

}

// Borrar productos del carrito
function borrarProducto(e){
    let botonClickeado = e.target;
    botonClickeado.parentElement.remove();
    actualizarTotal();
}



// Contar cambios
function contadorChanged(e){
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    actualizarTotal();
}

// Agregar al carrito
function agregarClick(e){
    let boton = e.target;
    let productos = boton.parentElement;
    let titulo = productos.getElementsByClassName("card-title")[0].innerText;
    let precio = productos.getElementsByClassName("precio")[0].innerText;
    let prodImg = productos.getElementsByClassName("product-img")[0].src;
    agregarProductoAlCarrito(titulo,precio, prodImg);
    actualizarTotal()
}


function agregarProductoAlCarrito(titulo,precio,prodImg){
    let productoCarrito = document.createElement("div");
    productoCarrito.classList.add("cart-box");
    let carritoItems = document.getElementsByClassName("cart-content")[0];
    let carritoItemsNombres = carritoItems.getElementsByClassName("cart-product-title");
    for(let i = 0; i < carritoItemsNombres.length; i++){
        if(carritoItemsNombres[i].innerText == titulo){
            alert("Ya añadiste este producto al carrito");
            return;
        }
    }

    const carritoProductos = `
            <img src="${prodImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${titulo}</div>
                <div class="cart-price">${precio}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
    `;
    productoCarrito.innerHTML = carritoProductos;
    carritoItems.append(productoCarrito);

    
    productoCarrito.getElementsByClassName("cart-remove")[0].addEventListener("click", borrarProducto);
    productoCarrito.getElementsByClassName("cart-quantity")[0].addEventListener("change", contadorChanged);
    
    let contador = document.getElementById("span-carrito");
    contador.innerText = carritoItemsNombres.length;
}





// Actualización del total 
function actualizarTotal(){
    let carritoContenido = document.getElementsByClassName("cart-content")[0];
    let carritoProductos = carritoContenido.getElementsByClassName("cart-box");
    let total = 0;
    for(let i = 0; i < carritoProductos.length; i++){
        let carritoProducto = carritoProductos[i];
        let precioProducto = carritoProducto.getElementsByClassName("cart-price")[0];
        let contadorProducto = carritoProducto.getElementsByClassName("cart-quantity")[0];
        let precio = parseInt(precioProducto.innerText.replace("$", ""));
        let contador = contadorProducto.value;
        total = total + (precio * contador);
    }

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
 */

