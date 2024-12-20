window.addEventListener("load",cargarEventListeners);
window.addEventListener("load",cargarProductos);
window.addEventListener("load",cargarCarrito);

// Simulacion de archivo JSON
const datosJSON = {
  "product": [
    { "id": 1, "nombre": "Manzana verde y Roja", "precio": "$3500/kg" , "imagen": "resources/pr1.png"},
    { "id": 2, "nombre": "Naranjas de todo tipo", "precio": "$2500/kg" , "imagen": "resources/pr2.png"},
    { "id": 3, "nombre": "Arandanos", "precio": "$3000/500gr" , "imagen": "resources/pr3.png"},
    { "id": 4, "nombre": "Frambuesa", "precio": "$2400/500gr" , "imagen": "resources/pr4.png"},
    { "id": 5, "nombre": "Frutilla", "precio": "$2500/kg" , "imagen": "resources/pr5.png"},
    { "id": 6, "nombre": "Bananas", "precio": "$3000/kg" , "imagen": "resources/pr6.png"},
    { "id": 7, "nombre": "Hamburguesa Vegana", "precio": "$5000" , "imagen": "resources/pr7.png"},
    { "id": 8, "nombre": "Rucula", "precio": "$3000/paquete" , "imagen": "resources/pr8.png"}
  ]
};

// Acceder a los datos JSON (Lo de arriba)

//Funciones para la carga de la pagina principal
function cargarProductos(){
	let infoElemento = {
		imagen: "",
		titulo: "",
		precio: "",
		id: ""
	}
	datosJSON.product.forEach(product => {
  		infoElemento = {
			imagen: product.imagen,
			titulo: product.nombre,
			precio: product.precio,
			id: product.id
		}
		
		let prod = document.createElement("div");
		prod.classList.add('product');
		prod.innerHTML = `
			<img src="${infoElemento.imagen}" alt="">
            	<div class="product-txt">
                	<h3>${infoElemento.titulo}</h3>
                    <p class="precio">${infoElemento.precio}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id=${infoElemento.id}">Agregar</a>
                </div>
			`;

		let lista = document.querySelector(".product-content");
		lista.appendChild(prod);

	});
}

function cargarCarrito() {
  // Obtener el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Si hay productos en el carrito, insertarlos en la tabla
  carrito.forEach(producto => {
    insertarCarrito(producto);
  });
}


//Funciones dinamicas dentro de la pagina

function cargarEventListeners(){
	document.getElementById("lista-1").addEventListener("click",comprarElemento);
	document.getElementById("carrito").addEventListener("click",eliminarElemento);
	document.getElementById("vaciar-carrito").addEventListener("click",vaciarCarrito);
	document.getElementById("botonOpinion").addEventListener("click",confirmarEnvio);
}

function confirmarEnvio(){
	//Lectura de datos
	let correo = document.getElementById("apartadoCorreo").value;
	let datos = document.getElementById("apartadoDatos").value;
	let comentarios = document.getElementById("apartadoComentarios").value;
	//Valores booleanos
	let comentarioCompleto = (comentarios != "");
	let datosCompletos = (datos != "");
	let correoCompleto = (correo != "");
	let informacionCompleta = ((correoCompleto)&&(datosCompletos)&&(comentarioCompleto));
	//Auxiliar de salida
	let avisoString = "Informacion Incompleta , porfavor intente llenar los siguientes campos:";

	if(informacionCompleta == false){
		//Alerta negativa
		if(correoCompleto == false){
			avisoString += "\n Su correo";
		}
		if(datosCompletos == false){
			avisoString += "\n Sus datos";
		}
		if(comentarioCompleto == false){
			avisoString += "\n El comentario";
		}
		alert(avisoString);
	}else{
		//Alerta de confirmacion
		alert("Se realizo correctamente el envio , gracias por su contribucion!")
	}
}

function comprarElemento(e){
	e.preventDefault();
	if(e.target.classList.contains("agregar-carrito")){
		let elemento = e.target.parentElement.parentElement;
		leerDatosElemento(elemento);
	}
}

function leerDatosElemento(elemento){
	let infoElemento = {
		imagen: elemento.querySelector("img").src,
		titulo: elemento.querySelector("h3").textContent,
		precio: elemento.querySelector(".precio").textContent,
		id: elemento.querySelector("a").getAttribute("data-id")
	}


	guardarElemento(infoElemento);
	insertarCarrito(infoElemento);
}

function guardarElemento(elemento) {
  // Obtener los productos del carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === elemento.id);

  if (!productoExistente) {
    // Agregar el nuevo producto si no existe
    carrito.push(elemento);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}

function insertarCarrito(elemento){
	//Insercion en HTML
	let row = document.createElement("tr");
	let lista = document.querySelector("#lista-carrito tbody");
	row.innerHTML = `<td><img src="${elemento.imagen}" width=100></td><td>${elemento.titulo}</td><td>${elemento.precio}</td><td><a href="#" class="borrar" data-id="${elemento.id}"> X </a></td>`;
	lista.appendChild(row);
}

function eliminarElemento(e){

	e.preventDefault();
  	let elemento, elementoId;

  	if (e.target.classList.contains("borrar")) {
    // Obtener el elemento a eliminar (tr) y su id
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector("a").getAttribute("data-id");

    // Eliminar el producto del carrito en el HTML
    elemento.remove();

    // Recuperar el carrito de localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar el carrito para eliminar el producto con el id correspondiente
    carrito = carrito.filter(item => item.id !== elementoId);

    // Volver a guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  	}

}

function vaciarCarrito(){
	let lista = document.querySelector("#lista-carrito tbody");
	while(lista.firstChild){
		lista.removeChild(lista.firstChild);
	}

	// Vaciar el carrito en localStorage
  	localStorage.removeItem('carrito');
  	return false;
}
