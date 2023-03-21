if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready(){
    let borrarBotones = document.getElementsByClassName("cart-remove")
    console.log(borrarBotones);
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
function borrarProducto(event){
    let botonClickeado = event.target;
    botonClickeado.parentElement.remove();
    actualizarTotal();
}



// Contar cambios
function contadorChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    actualizarTotal();
}

// Agregar al carrito
function agregarClick(event){
    let boton = event.target;
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


