
const encabezado = document.querySelector('#encabezado');
const btnDerecho = document.querySelector('#btnDerecho');
const btnIzquierdo = document.querySelector('#btnIzquierdo');
const slider = document.querySelector(".slider__contenedor");
const textoEncabezado = document.querySelector(".encabezado__mobile__p");

let seccionActual = 1;
let cantidadSlider = slider.children.length;

// ! Dar estilos automatico al slider 
slider.style.width = `${cantidadSlider*100}%`;

// ! Funciones al iniciar el programa
validarBotones();

// Funcionalidad a los botones

btnDerecho.addEventListener('click', (e)=>{
    moverDerecha();
    validarBotones();
    modificarSteps();
})

btnIzquierdo.addEventListener('click', (e)=>{
    moverIzquierda();
    validarBotones();
    modificarSteps();
})

function animacionEncabezado() {
    encabezado.classList.add('encabezado__mobile--animacion');
    setTimeout(()=>{
        encabezado.classList.remove('encabezado__mobile--animacion');
        textoEncabezado.innerHTML = `Paso ${seccionActual}`;
    }, 200);
}

function moverDerecha() {
    if (seccionActual != cantidadSlider) {
        animacionEncabezado();
        slider.style.marginLeft = `-${seccionActual*100}%`;
        seccionActual++;
    }
    console.log(seccionActual)
}

function moverIzquierda() {
    if (seccionActual != 1) {
        animacionEncabezado();
        slider.style.marginLeft = `-${(seccionActual-2)*100}%`;
        seccionActual--;
    }
}

function validarBotones() {
    if (seccionActual == 1) {
        btnIzquierdo.classList.add("buttons--inactivo");
    }
    else if (seccionActual == cantidadSlider) {
        btnDerecho.classList.add("buttons--inactivo");
    } else {
        btnDerecho.classList.remove("buttons--inactivo");
        btnIzquierdo.classList.remove("buttons--inactivo");
    }
}

// STEPS

const bigSteps = document.querySelectorAll(".bigStep");
const smallSteps = document.querySelectorAll(".smallStep");
const smallLines = document.querySelectorAll(".smallLine");

function modificarSteps() {
    for (let i=0; i< bigSteps.length; i++) {
        if (i<seccionActual) {
            bigSteps[i].classList.add("bigStep--activo");
        } else {
            bigSteps[i].classList.remove("bigStep--activo");
        }
    }

    for (let i=0; i< smallSteps.length; i++) {
        if (i<seccionActual) {
            smallSteps[i].classList.add("smallStep--activo");
        } else {
            smallSteps[i].classList.remove("smallStep--activo");
        }
    }

    for (let i=0; i< smallLines.length; i++) {
        if (i<(seccionActual-1)) {
            smallLines[i].classList.add("smallLine--activo");
        } else {
            smallLines[i].classList.remove("smallLine--activo");
        }
    }
}

modificarSteps();



// Seccion AREA - seleccionar card

const cardAreas = document.querySelectorAll(".card");

for(let i=0; i<cardAreas.length; i++) {
    cardAreas[i].addEventListener("click",()=>{
        cardAreas[i].classList.toggle("card--seleccionado");
        seleccionarArea(cardAreas[i].children[0].innerHTML);
        mostrarProcesos();
    })
}


// Seccion AREA - Arreglos de las Areas

let areas = [];

for (let i=0; i<cardAreas.length; i++){
    let area = [`${cardAreas[i].children[0].innerHTML}`, false];
    areas.push(area);
}

console.log(areas);

function seleccionarArea(nombre) {
    for (let i=0; i<areas.length; i++) {
        if (areas[i][0] == nombre) {
            if (areas[i][1] == false) {
                areas[i][1] = true;
            } else {
                areas[i][1] = false;
            }
        }
    }
}

// SECCION PROCESOS - Desplegar Áreas

let itemsAreas = document.querySelectorAll(".procesos .blockProcesos__fondo");

itemsAreas.forEach(elemento => {
  elemento.addEventListener("click", ()=>{


    let height = 0;
    let collapse = elemento.parentNode.querySelector(".blockProcesos__collapse");
    let contenedor = elemento.parentNode.querySelector(".blockProcesos__collapse__contenedor");

    if (!elemento.parentNode.classList.contains("blockProcesos__item--desplegado")) {
      height = contenedor.scrollHeight;

    }

    collapse.style.height = `${height}px`;

    // Animacion del fondo

    if (!elemento.parentNode.classList.contains("blockProcesos__item--desplegado")) {
        elemento.style.background = "#242B35";
        
        elemento.style.transition = "0s";
  
    } else {
        setTimeout(()=>{
            elemento.style.background = "transparent";
            elemento.style.transition = "0.2s";
        }, 300)
        
    }

    // Añadimos la clase

    elemento.parentNode.classList.toggle("blockProcesos__item--desplegado");

  })
});

// SECCION PROCESOS - Mostrar solo los procesos de las areas seleccionadas

//Asignar cada area seleccionada a un div

let blockProcesos = document.querySelector(".procesos .blockProcesos__items");

for (let i=0; i<blockProcesos.children.length; i++) {
    if (i != blockProcesos.children.length-1) {
        let nombreArea = blockProcesos.children[i].querySelector(".blockProcesos__area").innerHTML.toLowerCase();

        for (let j=0; j<areas.length; j++) {
            if (areas[j][0].toLowerCase() == nombreArea) {
                blockProcesos.children[i].setAttribute("data-nombre_area", `${nombreArea}`);
            }
        }
    }
}


// Mostrar procesos de las areas seleccionadas

function mostrarProcesos() {
    let siElementos = false;

    for (let i=0; i<areas.length; i++) {

        for(let j=0; j<blockProcesos.children.length; j++) {
            let nombreArea = blockProcesos.children[j].getAttribute('data-nombre_area');

            if (areas[i][0].toLowerCase() === nombreArea) {
                if (areas[i][1]) {
                    blockProcesos.children[j].style.display = "block";
                    siElementos = true;
                } else {
                    blockProcesos.children[j].style.display = "none";
                }
            }
        }
        
    }

    if(siElementos) {
        blockProcesos.children[blockProcesos.children.length-1].style.display = "none";
    } else {
        blockProcesos.children[blockProcesos.children.length-1].style.display = "block";
    }
}

mostrarProcesos()


// Seleccionar procesos

const procesos = document.querySelectorAll(".procesos .blockProcesos__proceso");

for (let i=0; i<procesos.length; i++) {
    procesos[i].addEventListener("click", ()=>{
        seleccionarProceso(procesos[i], i);
    })
}

function seleccionarProceso(elemento, posicicion) {
    // * Mostar visualmente que se selecciono
    elemento.classList.toggle("blockProcesos__proceso--seleccionado");

    // * Cambiar el estado del arreglo
    if (todosProcesos[posicicion].seleccionado) {
        todosProcesos[posicicion].seleccionado = false;
    } else {
        todosProcesos[posicicion].seleccionado = true;
    }
    
    // * Actualizar diseños
    actualizarProcesos(posicicion)
}

// ! OBTENER INFORMACION DE TODOS LOS PROCESOS 

const todosProcesos = [];

document.addEventListener('DOMContentLoaded', function() {
    const blockProcesosCollapseP = document.querySelectorAll(".procesos .blockProcesos__items .blockProcesos__collapse__p");
  
    for (let i=0; i<blockProcesosCollapseP.length; i++) {

        let rpa = blockProcesosCollapseP[i].nextElementSibling.querySelector(".blockProcesos__collapse__etiqueta--rpa");
        let hasRpa = false;

        if (rpa !== null) {
            hasRpa = true;
        }

        let ia = blockProcesosCollapseP[i].nextElementSibling.querySelector(".blockProcesos__collapse__etiqueta--ia");
        let hasIa = false;

        if (ia !== null) {
            hasIa = true;
        }

        let nombre = blockProcesosCollapseP[i].innerHTML.replace(/\s+/g, ' ').trim(); // Reemplazar múltiples espacios con un solo espacio y luego hacer trim
        let area = blockProcesosCollapseP[i].parentNode.parentNode.parentNode.parentNode.querySelector(".blockProcesos__area").innerHTML;

        todosProcesos.push(
            {
                id: i,
                nombre: nombre,
                area: area,
                rpa: hasRpa,
                ia: hasIa,
                seleccionado: false
            }
        );
    }
  
    console.log(todosProcesos);
});

 // ! ABRIR Y CERRAR BUSCADOR

const btnAbrirBuscador = document.querySelector(".blockBuscador__button");
const blockBuscadorContenedor = document.querySelector(".blockBuscador__contenedor");

btnAbrirBuscador.addEventListener("click", ()=>{
    blockBuscadorContenedor.style.display = "flex";
    setTimeout(()=>{
        blockBuscadorContenedor.classList.add("blockBuscador__contenedor--animacion");
    }, 100)
})

blockBuscadorContenedor.addEventListener('mousedown', function(event) {
    const blockBuscadorContenido = document.querySelector('.blockBuscador__contenido');
    console.log(blockBuscadorContenido.contains(event.target))
    if (!blockBuscadorContenido.contains(event.target)) {
        blockBuscadorProc.classList.remove("blockBuscador__proc--animacion")
        console.log("dd")
        setTimeout(()=>{
            blockBuscadorContenedor.classList.remove("blockBuscador__contenedor--animacion");
        }, 100) // duracion de la animacion anterior + 0.1s de espera
        setTimeout(()=>{
            blockBuscadorContenedor.style.display = "none";
        }, 500) // 0.4s + 0.1s de espera + 0.5s animacion del anterior animacion
    }
});



// ! ANIMACION 

const blockBuscadorInput = document.querySelector(".blockBuscador__input");
const blockBuscadorProc = document.querySelector(".blockBuscador__proc");
const blockBuscadorList = document.querySelector(".blockBuscador__list");
const blockBuscadorI = document.querySelector(".blockBuscador__group .blockBuscador__i");

blockBuscadorInput.addEventListener("focus", ()=>{
    blockBuscadorProc.classList.add("blockBuscador__proc--animacion")
    blockBuscadorI.classList.add("blockBuscador__i--animacion")
})

blockBuscadorInput.addEventListener("blur", ()=>{
    blockBuscadorI.classList.remove("blockBuscador__i--animacion")
})


// ! LLENAR LA LISTA DEL BUSCADOR CON LOS PROCESOS

document.addEventListener('DOMContentLoaded', function() {

for (let i=0; i < todosProcesos.length; i++) {
    let proceso = document.createElement("div");
    let rpa = "";
    let ia = "";

    if (todosProcesos[i].area.toLowerCase() == "operación") {
        proceso.classList.add("blockProcesos__proceso--core");
    }

    proceso.classList.add("blockProcesos__proceso");
    proceso.addEventListener("click", ()=>{

        // * Mostar visualmente que se selecciono
        proceso.classList.toggle("blockProcesos__proceso--seleccionado");

        // * Cambiar el estado del arreglo
        if (todosProcesos[i].seleccionado) {
            todosProcesos[i].seleccionado = false;
        } else {
            todosProcesos[i].seleccionado = true;
        }

        // * Actualizar diseño
        actualizarProcesos(i);
    })

    if (todosProcesos[i].rpa) {
        rpa = `
            <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--rpa">
                <i class="fa-solid fa-robot e1"></i>
                <span class="e1">RPA</span>
            </div>
        `;
    }

    if (todosProcesos[i].ia) {
        ia = `
            <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--ia">
                <i class="fa-solid fa-brain e2"></i>
                <span class="e2">IA</span>
            </div>
        `;
    }

    proceso.innerHTML = `
        <div class="blockProcesos__collapse__icono">
            <div class="blockProcesos__collapse__circulo"><i class="fa-solid fa-plus"></i></div>
        </div>
        <div class="blockProcesos__collapse__p">
            <strong>
                ${primeraLetraMayuscula(todosProcesos[i].area)}
            </strong>
            <p>
                ${todosProcesos[i].nombre}
            </p>
        </div>
        <div class="blockProcesos__collapse__etiquetas">
            ${rpa}
            ${ia}
        </div>
    `;

    blockBuscadorList.appendChild(proceso);

}

})

function primeraLetraMayuscula(cadena) {
    // Verificar si la cadena no está vacía
    if (cadena.length === 0) {
        return cadena; // Devolver la cadena original si está vacía
    }

    // Obtener la primera letra y convertirla a mayúscula
    var primeraLetraMayuscula = cadena.charAt(0).toUpperCase();

    // Concatenar la primera letra mayúscula con el resto de la cadena
    var restoCadena = cadena.slice(1);

    // Devolver la cadena con la primera letra en mayúscula y el resto sin cambios
    return primeraLetraMayuscula + restoCadena;
}

// ! ACTUALIZAR EL DISEÑO DE ESCOGE TUS PROCESOS Y DEL BUSCADOR

function actualizarProcesos(posicicion) {

    if (todosProcesos[posicicion].seleccionado) {
        
        // * Actualizar en el general
        procesos[posicicion].classList.add("blockProcesos__proceso--seleccionado");

        // * Actualizar en el buscador
        blockBuscadorList.children[posicicion].classList.add("blockProcesos__proceso--seleccionado");

        // * Actualizar en el carrito
        añadirProcesoAlCarrito(posicicion);


    } else {

        // * Actualizar en el general
        procesos[posicicion].classList.remove("blockProcesos__proceso--seleccionado");

        // * Actualizar en el buscador
        blockBuscadorList.children[posicicion].classList.remove("blockProcesos__proceso--seleccionado");
        
        // * Actualizar en el carrito
        eliminarProcesoDelCarrito(posicicion);

    }

    // * Verificar elementos del carrito y mostrar mensaje

    verificarCarrito()
}

// ! FILTRAR MIENTRAS SE ESCRIBE EN EL BUSCADOR

blockBuscadorInput.addEventListener("keyup",(e)=>{
    let texto = blockBuscadorInput.value.toLowerCase();
    let encontrado = false;
    let blockUltimo = document.querySelector(".blockBuscador__proc .blockProcesos__contenedor");

    // * Buscar

    for (let i=0; i<blockBuscadorList.children.length; i++) {

        let parrafo = blockBuscadorList.children[i].querySelector(".blockProcesos__collapse__p p")

        if (parrafo !== null) {

            parrafo = parrafo.innerHTML.toLowerCase();

            if (parrafo.includes(texto)) {
                blockBuscadorList.children[i].style.display = "grid";
                setTimeout(()=>{
                    blockBuscadorList.children[i].classList.remove("blockProcesos__proceso--eliminar");
                }, 100)
                encontrado = true;
            } else {
                blockBuscadorList.children[i].classList.add("blockProcesos__proceso--eliminar");
                setTimeout(()=>{
                    blockBuscadorList.children[i].style.display = "none";
                }, 400)
            }
        }
    }

    // * Mostrar mensaje que no se encontro la busqueda

    if (encontrado) {

        blockUltimo.classList.add("blockProcesos__contenedor--eliminar");
        setTimeout(()=>{
            blockUltimo.style.display = "none";
        }, 400)

    } else {

        blockUltimo.style.display = "grid";
        setTimeout(()=>{
            blockUltimo.classList.remove("blockProcesos__contenedor--eliminar");
        }, 100)
    }

})


// ! SECCION CARRITO DE PROCESOS

// ! ANIMACION DE LAS OPCIONES DE LOS PROCESOS SELECCIONADOS

document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        let ele = document.querySelector(".procesosSeleccionados .blockProcesos__item:last-child");
        let ele2 = document.querySelector(".procesosSeleccionados .blockProcesos__item:nth-last-child(2)");

        ele.classList.toggle("blockProcesos__item--moverArriba");
        ele2.classList.toggle("blockProcesos__item--moverAbajo");
    }
})


// ! AÑADIR AL CARRITO LOS PROCESOS SELECCIONADOS

const carrito = document.querySelector(".procesosSeleccionados .blockProcesos__items");

function añadirProcesoAlCarrito(id) {
    let rpa = "";
    let ia = "";
    let clase = "";

    if (todosProcesos[id].rpa) {
        rpa = `
            <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--rpa">
                <i class="fa-solid fa-robot e1"></i>
                <span class="e1">RPA</span>
            </div>
        `;
    }

    if (todosProcesos[id].ia) {
        ia = `
            <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--ia">
                <i class="fa-solid fa-brain e2"></i>
                <span class="e2">IA</span>
            </div>
        `;
    }

    //

    if (todosProcesos[id].area == "operación") {
        clase = "procesosSeleccionados__strong--core";
    }

    //

    let proceso = `
        <div class="blockProcesos__item" data-id="${id}">
            <div class="blockProcesos__proceso">
                <div class="blockProcesos__collapse__p">
                    <strong class="${clase}">
                        ${primeraLetraMayuscula(todosProcesos[id].area)}
                    </strong>
                    <p>
                        ${todosProcesos[id].nombre}
                    </p>
                </div>
                <div class="blockProcesos__collapse__etiquetas">
                    ${rpa}
                    ${ia}
                </div>
            </div>

            <div class="procesosSeleccionados__control">
                <div class="procesosSeleccionados__opciones">
                    <div class="circulo circulo--arriba" onclick="moverArriba(this)">
                        <i class="fa-solid fa-angle-up"></i>
                    </div>
                    <div class="circulo circulo--eliminar" onclick="eliminarProcesoDelCarrito2(this, ${id})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="circulo circulo--abajo" onclick="moverAbajo(this)">
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </div>
        </div>
    `;

    carrito.innerHTML += proceso;
}


// ! ELIMINAR DEL CARRITO LOS PROCESOS DESELECCIONADOS - DEL GENERAL Y BUSCADOR

function eliminarProcesoDelCarrito(id) {

    let procesoEliminar;

    for(let i=0; i<carrito.children.length; i++) {
        if (carrito.children[i].getAttribute("data-id") == id) {
            procesoEliminar = carrito.children[i];
        }
    }

    carrito.removeChild(procesoEliminar);
}

// ! ELIMINAR DEL CARRITO LOS PROCESOS DESELECCIONADOS - DEL CARRITO

function eliminarProcesoDelCarrito2(elemento, id) {

    // * Actualizar el arreglo

    todosProcesos[id].seleccionado = false;

    // * Eliminar del carrito
    
    elemento = elemento.parentNode.parentNode.parentNode;

    elemento.children[0].style.height = `${elemento.scrollHeight}px`;

    setTimeout(()=>{
        elemento.classList.add("blockProcesos__item--animacion");
    }, 100)

    setTimeout(()=>{
        carrito.removeChild(elemento);
    }, 600) // igual al que abajo
    

    // * Eliminar del buscador

    blockBuscadorList.children[id].classList.remove("blockProcesos__proceso--seleccionado");

    // * Eliminar del general

    procesos[id].classList.remove("blockProcesos__proceso--seleccionado");

    // * Verificar elementos y mostrar mensaje

    setTimeout(()=>{
        verificarCarrito()
    }, 600) // igual al que arriba

}

// ! MOSTRAR MENSAJE QUE NO HAY ELEMENTOS EN EL CARRITO

const mensajeCarritoVacio = document.querySelector(".procesosSeleccionados .blockProcesos__contenedor--eliminar");

function verificarCarrito() {
    if (carrito.children.length > 0) {
        mensajeCarritoVacio.style.opacity = "0";
        setTimeout(()=>{
            mensajeCarritoVacio.style.display = "none";
        }, 500)
    } else {
        mensajeCarritoVacio.style.display = "flex";
        setTimeout(()=>{
            mensajeCarritoVacio.style.opacity = "1";
        }, 100)
    }
}

// ! ANIMACIONES DE MOVER DE POSICION

function moverAbajo(elemento) {

    elemento = elemento.parentNode.parentNode.parentNode;

    for (let i=0; i<carrito.children.length; i++) {
        if (carrito.children[i] == elemento) {
            let elementoActual = carrito.children[i]
            let elementoSiguiente = carrito.children[i+1];

            elementoActual.classList.add("blockProcesos__item--moverAbajo");
            elementoActual.style.transition = "0.5s";
            elementoSiguiente.classList.add("blockProcesos__item--moverArriba");
            elementoSiguiente.style.transition = "0.5s";

            setTimeout(()=>{
                elementoActual.classList.remove("blockProcesos__item--moverAbajo");
                elementoActual.style.transition = "0s";
                elementoSiguiente.classList.remove("blockProcesos__item--moverArriba");
                elementoSiguiente.style.transition = "0s";

                carrito.insertBefore(elementoSiguiente, elementoActual);
        
            }, 500)

            break;
        }
    }
}

function moverArriba(elemento) {

    elemento = elemento.parentNode.parentNode.parentNode;

    for (let i=0; i<carrito.children.length; i++) {
        if (carrito.children[i] == elemento) {
            let elementoActual = carrito.children[i]
            let elementoAnterior = carrito.children[i-1];

            elementoActual.classList.add("blockProcesos__item--moverArriba");
            elementoActual.style.transition = "0.5s";
            elementoAnterior.classList.add("blockProcesos__item--moverAbajo");
            elementoAnterior.style.transition = "0.5s";

            setTimeout(()=>{
                elementoActual.classList.remove("blockProcesos__item--moverArriba");
                elementoActual.style.transition = "0s";
                elementoAnterior.classList.remove("blockProcesos__item--moverAbajo");
                elementoAnterior.style.transition = "0s";

                carrito.insertBefore(elementoActual, elementoAnterior);
        
            }, 500)

            break;
        }
    }
}