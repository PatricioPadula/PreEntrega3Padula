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
        let price = parseInt(item.precio.toString().replace("$", ""));
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