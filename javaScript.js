window.addEventListener("load",cargarEventListeners);

function cargarEventListeners(){
	document.getElementById("lista-1").addEventListener("click",comprarElemento);
	document.getElementById("carrito").addEventListener("click",eliminarElemento);
	document.getElementById("vaciar-carrito").addEventListener("click",vaciarCarrito);
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
	insertarCarrito(infoElemento);
}

//No hace la lectura de los datos del producto , revisar.

function insertarCarrito(elemento){
	let row = document.createElement("tr");
	let lista = document.querySelector("#lista-carrito tbody");
	row.innerHTML = '<td><img src="$(elemento.imagen)" width=100></td><td>$(elemento.titulo)</td><td>$(elemento.precio)</td><td><a href="#" class="borrar" data-id="$(elemento.id)"> X </a></td>';
	lista.appendChild(row);
}

function eliminarElemento(e){
	e.preventDefault();
	let elemento,elementoId;
	if(e.target.classList.contains("borrar")){
		e.target.parentElement.parentElement.remove();
		elemento = e.target.parentElement.parentElement;
		elementoId = elemento.querySelector("a").getAttribute("data-id");

	}
}

function vaciarCarrito(){
	let lista = document.querySelector("#lista-carrito tbody");
	while(lista.firstChild){
		lista.removeChild(lista.firstChild);
	}
	return false;
}
