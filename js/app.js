


const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {

    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    //Muestra los cursos de localstorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHtml();
    })
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}


//Eliminar curso de un carrito
function eliminarCurso(e){
    console.log('Desde eliminar curso');

    if(e.target.classList.contains('borrar-curso')){
        console.log(e.target.getAttribute('data-id'));

        const cursoId= e.target.getAttribute('data-id');

        //Genero un nuevo array sin el id seleccionado ( lo borramos )
        articulosCarrito = articulosCarrito.filter( curso => 
            curso.id !== cursoId)

            //Generamos el html de nuevo para que se actualice 
            carritoHTML();
    
}
}



function leerDatosCurso(curso) {

    console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //Revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){

        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son duplicados
            }
        });
        
        articulosCarrito = [...cursos];
    }else{

    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
 
    }



    carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML() {

 

    //limpiar html
    limpiarHtml();

    //Recorre el carrito y genera el html
    articulosCarrito.forEach((curso) => {


           //para no utilizar curso.imagen...
    const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr")

        row.innerHTML = `

        <td>
            <img src=" ${imagen}" width="100">
        </td>   
        <td>
            ${titulo}
        </td> 
        <td>
            ${precio}
        </td> 

        <td>
            ${cantidad}
        </td>   
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });


    //Sincronizar con storage, agregar el carrito de storage
    sincronizarStorage();
}



function sincronizarStorage(){

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHtml() {

    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}









