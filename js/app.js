
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
    if (seccionActual != cantidadSlider && seccionActual != (cantidadSlider-1)) {
        animacionEncabezado();
        slider.style.marginLeft = `-${seccionActual*100}%`;
        seccionActual++;
    }
    if (seccionActual == 7) {
        mostrarResultados()
    }
    console.log(seccionActual)
}

function moverIzquierda() {
    if (seccionActual != 1 && seccionActual != cantidadSlider) {
        animacionEncabezado();
        slider.style.marginLeft = `-${(seccionActual-2)*100}%`;
        seccionActual--;
    }

}

function validarBotones() {
    if (seccionActual == 1) {
        btnIzquierdo.classList.add("buttons--inactivo");
    }
    else if (seccionActual == (cantidadSlider-1)) {
        btnDerecho.classList.add("buttons--inactivo");
    }
    else if (seccionActual == cantidadSlider) {
        btnDerecho.classList.add("buttons--inactivo");
        btnIzquierdo.classList.add("buttons--inactivo");
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

const cardAreas = document.querySelectorAll(".area .card");

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

console.group('ARREGLO AREAS');
  console.table(areas);
console.groupEnd();

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

const itemsAreas = document.querySelectorAll(".procesos .blockProcesos__fondo");
let isClickable = true;
let isIgnore = false;

itemsAreas.forEach(elemento => {
  elemento.addEventListener("click", ()=>{

    desplegar(elemento)

    // Cerramos los otros collapse de las areas

    for(let i=0; i<blockProcesos.children.length-1; i++) {
        if (blockProcesos.children[i] != elemento.parentNode) {
            if(blockProcesos.children[i].classList.contains("blockProcesos__item--desplegado")){
                isIgnore = true
                desplegar(blockProcesos.children[i].children[0])
                isIgnore = false;
            }
        }
    }

  })
});

function desplegar(elemento) {

    console.log(elemento.parentNode)

    if (!isIgnore) {
        if (!isClickable) {
            return; // Salir de la función si no se puede hacer clic
        }
    
        // Desactivar el clic durante 0.5 segundos
        isClickable = false;
        setTimeout(() => {
          isClickable = true;
        }, 500);
    }

    let collapse = elemento.parentNode.querySelector(".blockProcesos__collapse");
    let contenedor = elemento.parentNode.querySelector(".blockProcesos__collapse__contenedor");

    if (!elemento.parentNode.classList.contains("blockProcesos__item--desplegado")) {
        collapse.style.height = `${contenedor.clientHeight}px`;
        setTimeout(()=>{
            collapse.style.height = `auto`;
        }, 500)
    } else {
        collapse.style.height = `${contenedor.clientHeight}px`;
        collapse.style.transition = `0s`;
        setTimeout(()=>{
            collapse.style.height = `0px`;
            collapse.style.transition = `0.4s`;
        }, 10)
    }


    // Animacion del fondo

    if (!elemento.parentNode.classList.contains("blockProcesos__item--desplegado")) {
        elemento.style.background = "#242B35";
        
        elemento.style.transition = "0s";
  
    } else {
        setTimeout(()=>{
            elemento.style.background = "transparent";
            elemento.style.transition = "0.3s";
        }, 300)
        
    }

    // Añadimos la clase

    elemento.parentNode.classList.toggle("blockProcesos__item--desplegado");
}

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
let iterador;

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
  
    console.group('ARREGLO PROCESOS');
        console.table(todosProcesos);
    console.groupEnd();

    iterador = todosProcesos.length;
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
    if (!blockBuscadorContenido.contains(event.target)) {
        blockBuscadorProc.classList.remove("blockBuscador__proc--animacion")
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

    // * Actualizar en la priorizacion
    modificarProcesosPriorizacion()
}

// ! FILTRAR MIENTRAS SE ESCRIBE EN EL BUSCADOR

const blockUltimo = document.querySelector(".procesos .blockProcesos__contenedor--eliminar");

blockBuscadorInput.addEventListener("keyup",(e)=>{
    let texto = blockBuscadorInput.value.toLowerCase();
    let encontrado = false;

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

        blockBuscadorProc.style.height = ``;


    } else {

        blockUltimo.style.display = "flex";
        setTimeout(()=>{
            blockUltimo.classList.remove("blockProcesos__contenedor--eliminar");
        }, 100)

        btnBotonNuevo.classList.remove("procesos__botonNuevo--creado");

        blockBuscadorProc.style.height = `${blockBuscadorProc.children[1].scrollHeight + 30}px`;

    }
    

})

// ! AÑADIR EL PROCESO QUE FUE CREADO EN EL BUSCADOR Y COLOCARLO EN EL CARRITO

const btnBotonNuevo = document.querySelector(".procesos .procesos__botonNuevo");

btnBotonNuevo.addEventListener("click", ()=>{

    btnBotonNuevo.classList.add("procesos__botonNuevo--creado");

    let texto = primeraLetraMayuscula(blockBuscadorInput.value.toLowerCase());

    carrito.innerHTML += `
        <div class="blockProcesos__item" data-id="${iterador}">
            <div class="blockProcesos__proceso">
                <div class="blockProcesos__collapse__p">
                    <strong class="procesosSeleccionados__strong--nuevo">
                        Nuevo
                    </strong>
                    <p>
                        ${texto}
                    </p>
                </div>
                <div class="blockProcesos__collapse__etiquetas">
                    <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--rpa">
                        <i class="fa-solid fa-robot e1"></i>
                        <span class="e1">RPA</span>
                    </div>
                    <div class="blockProcesos__collapse__etiqueta blockProcesos__collapse__etiqueta--ia">
                        <i class="fa-solid fa-brain e2"></i>
                        <span class="e2">IA</span>
                    </div>
                </div>
            </div>

            <div class="procesosSeleccionados__control">
                <div class="procesosSeleccionados__opciones">
                    <div class="circulo circulo--arriba" onclick="moverArriba(this)">
                        <i class="fa-solid fa-angle-up"></i>
                    </div>
                    <div class="circulo circulo--eliminar" onclick="eliminarProcesoDelCarrito2(this, ${iterador})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="circulo circulo--abajo" onclick="moverAbajo(this)">
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </div>
        </div>
    `;

    verificarCarrito()

    iterador++;

    // * Actualizar procesos de priorizacion
    modificarProcesosPriorizacion()
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

    // * Actualizar procesos de priorizacion
    modificarProcesosPriorizacion()
}

// ! ELIMINAR DEL CARRITO LOS PROCESOS DESELECCIONADOS - DEL CARRITO

function eliminarProcesoDelCarrito2(elemento, id) {


    // * SI SON PROCESOS DE DIGNITA

    if (id < todosProcesos.length) {

        // * Actualizar el arreglo

        todosProcesos[id].seleccionado = false;
        
        // * Eliminar del buscador

        blockBuscadorList.children[id].classList.remove("blockProcesos__proceso--seleccionado");

        // * Eliminar del general

        procesos[id].classList.remove("blockProcesos__proceso--seleccionado");
    }


    // * Eliminar del carrito
        
    elemento = elemento.parentNode.parentNode.parentNode;

    elemento.children[0].style.height = `${elemento.children[0].scrollHeight}px`;

    setTimeout(()=>{
        elemento.classList.add("blockProcesos__item--animacion");
    }, 100)

    setTimeout(()=>{
        carrito.removeChild(elemento);
    }, 600) // igual al que abajo


    // * Verificar si hay elementos y mostrar mensaje

    setTimeout(()=>{
        verificarCarrito()
    }, 600) // igual al que arriba

    
    // * Actualizar procesos de priorizacion

    setTimeout(()=>{
        modificarProcesosPriorizacion()
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

                // * Actualizar procesos de priorizacion
                modificarProcesosPriorizacion()
        
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
                
                // * Actualizar procesos de priorizacion
                modificarProcesosPriorizacion()

            }, 500)

            break;
        }
    }

    
}



// ! ------------------ SECCION ESCOGE TUS CRITERIOS ----------------------

// ! MOSTRAR LOS CRITERIOS SELECCIONADOS

const cardcriterios = document.querySelectorAll(".criterios .card");

for(let i=0; i<cardcriterios.length; i++) {
    cardcriterios[i].addEventListener("click",()=>{
        cardcriterios[i].classList.toggle("card--seleccionado");
        seleccionarCriterio(cardcriterios[i].children[0].innerHTML);
        mostrarPriorizacion();
        modificarBarra()
        modificarProcesosPriorizacion()
    })
}


// Arreglos de las criterios

const criterios = [];

for (let i=0; i<cardcriterios.length; i++){
    let criterio = [`${cardcriterios[i].children[0].innerHTML}`, false];
    criterios.push(criterio);
}

console.group('ARREGLO CRITERIOS');
  console.table(criterios);
console.groupEnd();


function seleccionarCriterio(nombre) {
    for (let i=0; i<criterios.length; i++) {
        if (criterios[i][0] == nombre) {
            if (criterios[i][1] == false) {
                criterios[i][1] = true;
            } else {
                criterios[i][1] = false;
            }
        }
    }
}



//Asignar cada criterio seleccionada a un div

let cajaContenedor = document.querySelector(".prioriza .caja__contenedor");


for (let i=0; i<cajaContenedor.children.length; i++) {
    if (i != cajaContenedor.children.length-1) {
        
        cajaContenedor.children[i].setAttribute("data-nombre_criterio", `${criterios[i][0]}`);

    }
}



let seccionActual2 = 1;
let cantidadSlider2 = 0;

// Mostrar las secciones de los criterios seleccionados

function mostrarPriorizacion() {
    let siElementos = false;

    // * Resetear
    cantidadSlider2 = 0;
    seccionActual2 = 1;
    cajaContenedor.style.marginLeft = `0%`;

    for (let i=0; i<criterios.length; i++) {

        for(let j=0; j<cajaContenedor.children.length-1; j++) {
            let nombreArea = cajaContenedor.children[j].getAttribute('data-nombre_criterio');

            if (criterios[i][0].toLowerCase() === nombreArea.toLowerCase()) {
                if (criterios[i][1]) {
                    cajaContenedor.children[j].style.display = "flex";
                    siElementos = true;
                    cantidadSlider2++;
                } else {
                    cajaContenedor.children[j].style.display = "none";
                }
            }
        }
        
    }

    if(siElementos) {
        cajaContenedor.children[cajaContenedor.children.length-1].style.display = "none";
    } else {
        cajaContenedor.children[cajaContenedor.children.length-1].style.display = "flex";
        cantidadSlider2++;
    }


    // * Dar tamaño al slider
    cajaContenedor.style.width = `${cantidadSlider2*100}%`;

    //
    validarBotones2();

}

// ! Slider

const btnDerecho2 = document.querySelector('.prioriza .derecha');
const btnIzquierdo2 = document.querySelector('.prioriza .izquierda');


mostrarPriorizacion()


// ! Funciones al iniciar el programa
validarBotones2();

// Funcionalidad a los botones

btnDerecho2.addEventListener('click', (e)=>{
    moverDerecha2();
    validarBotones2();
    modificarBarra()
})

btnIzquierdo2.addEventListener('click', (e)=>{
    moverIzquierda2();
    validarBotones2();
    modificarBarra()
})

function moverDerecha2() {
    if (seccionActual2 != cantidadSlider2) {
        cajaContenedor.style.marginLeft = `-${seccionActual2*100}%`;
        seccionActual2++;
    }
}

function moverIzquierda2() {
    if (seccionActual2 != 1) {
        cajaContenedor.style.marginLeft = `-${(seccionActual2-2)*100}%`;
        seccionActual2--;
    }
}

function validarBotones2() {
    if (cantidadSlider2 < 2) {
        btnIzquierdo2.classList.add("buttons--inactivo");
        btnDerecho2.classList.add("buttons--inactivo");
    } else {
        if (seccionActual2 == 1) {
            btnIzquierdo2.classList.add("buttons--inactivo");
            btnDerecho2.classList.remove("buttons--inactivo");
        } 
    
        else if (seccionActual2 == cantidadSlider2) {
            btnIzquierdo2.classList.remove("buttons--inactivo");
            btnDerecho2.classList.add("buttons--inactivo");
        } else {
            btnDerecho2.classList.remove("buttons--inactivo");
            btnIzquierdo2.classList.remove("buttons--inactivo");
        }
    }

}

const barra = document.querySelector(".prioriza .barra");

function modificarBarra() {
    if (cantidadSlider2 < 2) {
        barra.style.width = "0";
    } 
    
    else {
        if (seccionActual2 == 1) {
            barra.style.width = "1.5rem";
        } 
        
        else {
            barra.style.width = `${((seccionActual2-1)*100)/(cantidadSlider2-1)}%`;
        }
    }
}

modificarBarra()

// ! FUNCIONALIDAD DE LAS ESTRELLAS

function agregarFuncionalidadEstrellas() {
    let estrellas = document.querySelectorAll(".prioriza .caja__estrella");

    for(let i = 0; i<estrellas.length; i++) {
        if (i<5) {
            estrellas[i].setAttribute("onclick", `calificar(this, ${i})`);
        }
        else {
            estrellas[i].setAttribute("onclick", `calificar(this, ${i%5})`);
        }
    }
}


function calificar(estrella, posicicion) {
    let pos = posicicion+1;
    let padre = estrella.parentNode;
    let siContieneClase = false;

    if (!padre.classList.contains(`caja__estrellas--inhabilitado${pos}`)) {
        // Quitamos las clases
        for(let i=0; i<5; i++) {
            if (padre.classList.contains(`caja__estrellas--activo${i+1}`)) {
                siContieneClase = true;
                break;
            }
        }

        if (siContieneClase) {
            if (padre.classList.contains(`caja__estrellas--activo${pos}`)) {
                padre.classList.remove(`caja__estrellas--activo${pos}`)
                quitarInhabilitadoHermanos(padre, posicicion);
            } else {
                //nada
            }

            puntuar(padre, pos, false);

        } else {
            padre.classList.add(`caja__estrellas--activo${pos}`)
            agregarInhabilitadoHermanos(padre, posicicion)
            puntuar(padre, pos, true);
        }

    }


}

function agregarInhabilitadoHermanos(padre, posicicion) {
    let todos = padre.parentNode.parentNode.querySelectorAll(".caja__estrellas")
    for(let i=0; i < todos.length; i++) {
        if (todos[i] != padre) {
            todos[i].classList.add(`caja__estrellas--inhabilitado${posicicion+1}`);
        }
    }
}

function quitarInhabilitadoHermanos(padre, posicicion) {
    let todos = padre.parentNode.parentNode.querySelectorAll(".caja__estrellas")
    for(let i=0; i < todos.length; i++) {
        if (todos[i] != padre) {
            todos[i].classList.remove(`caja__estrellas--inhabilitado${posicicion+1}`);
        }
    }
}

// ! Mostrar procesos en todos los criterios

let priorizacion = [];
const listaProcesosPrio = document.querySelectorAll(".prioriza .caja__contenido");

function modificarProcesosPriorizacion() {

    priorizacion = [];

    for (let i=0; i<5; i++) {
        
        if (carrito.children[i] !== undefined) {
            priorizacion.push(
                {
                    area: carrito.children[i].querySelector("strong").innerHTML.replace(/\s+/g, ' ').trim(),
                    proceso: carrito.children[i].querySelector("p").innerHTML.replace(/\s+/g, ' ').trim(),
                    calificacion: []
                }
            )
        }
    }

    for(let i=0; i<priorizacion.length; i++) {
        for(let j=0; j<criterios.length; j++) {
            if (criterios[j][1]) {
                priorizacion[i].calificacion.push(
                    {
                        criterio: criterios[j][0],
                        puntaje: 0
                    }
                )
            }
        }
    }

    let elementos = "";
    let siElementos = false;

    for (let j=0; j<5; j++) {
        if (priorizacion[j] !== undefined) {
            siElementos = true;
            elementos += `
                <div class="caja__fila">
                    <p class="caja__proceso">
                        ${priorizacion[j].proceso}
                    </p>
                    <div class="caja__estrellas">
                        <i class="fa-solid fa-star caja__estrella"></i>
                        <i class="fa-solid fa-star caja__estrella"></i>
                        <i class="fa-solid fa-star caja__estrella"></i>
                        <i class="fa-solid fa-star caja__estrella"></i>
                        <i class="fa-solid fa-star caja__estrella"></i>
                    </div>
                </div>
            `;
        }
    }

    if (!siElementos) {
        elementos = `
            <div class="caja__fila">
                <p class="caja__proceso">
                    No hay ningún proceso en el carrito 
                </p>
            </div>
        `;
    }
    

    for(let i=0; i<criterios.length; i++) {

        if (criterios[i][1]) {
            listaProcesosPrio[i].innerHTML = elementos;
        }
    }


    agregarFuncionalidadEstrellas()


}

function puntuar(padre, pos, hasClass) {
    let contenido = padre.parentNode.parentNode;
    let fila = padre.parentNode;
    let nombreCriterio = padre.parentNode.parentNode.parentNode.getAttribute("data-nombre_criterio");
    let posProceso;
    let posCriterio;

    for(let i=0; i<contenido.children.length; i++) {
        if (contenido.children[i] == fila) {
            posProceso = i;
            break
        }
    }

    for(let i=0; i<priorizacion[posProceso].calificacion.length; i++) {
        if(priorizacion[posProceso].calificacion[i].criterio == nombreCriterio) {
            posCriterio = i;
            break
        }
    }

    if(hasClass) {
        priorizacion[posProceso].calificacion[posCriterio].puntaje = convertirPuntaje(pos);
    } else {
        priorizacion[posProceso].calificacion[posCriterio].puntaje = 0;
    }

}

function convertirPuntaje(numero) {
    if (numero == 5) return 1
    if (numero == 4) return 2
    if (numero == 3) return 3
    if (numero == 2) return 4
    if (numero == 1) return 5
}

let suma = [];

function mostrarResultados() {
    suma = [["", 0],["", 0],["", 0],["", 0],["", 0]];

    for (let i=0; i<priorizacion.length; i++) {
        suma[i][0] += priorizacion[i].proceso;
        for(let j=0; j<priorizacion[i].calificacion.length; j++) {
            suma[i][1] += priorizacion[i].calificacion[j].puntaje * 10;
        }
    }

    // Ordenamos el arreglo de mayor a menor
    suma.sort(function(a, b) {
        return b[1] - a[1];
    });

    console.group('ARREGLO SUMA');
        console.table(suma);
    console.groupEnd();

    generarDetallesCita()
}

// ! SECCION DE MOSTRAR RESULTADOS

const $grafico = document.querySelector(".grafico");

function mostrarGrafico(arreglo) {

    let procesos = arreglo.map(function(elemento) {
        return elemento[0]; // Obteniendo el primer elemento de cada subarreglo
    });

    let puntajes = arreglo.map(function(elemento) {
        return elemento[1]; // Obteniendo el segundo elemento de cada subarreglo
    });

    // Las etiquetas son las porciones de la gráfica
    let etiquetas = procesos;
    //etiquetas5 = etiquetas5.filter(elemento => elemento !== "" && elemento !== ",");
    let datos = puntajes;
    //datos5 = datos5.filter(elemento => elemento !== "" && elemento !== ",");
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosIngresos = {
        data: datos, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
        backgroundColor: [
            'rgba(255,112,66, 0.2)',
            'rgba(212,255,146, 0.2)',
            'rgba(190,220,255, 0.2)',
            'rgba(255,219,149, 0.2)',
            'rgba(36,43,53, 0.2)'
        ],// Color de fondo
        borderColor: [
            'rgba(255,112,66, 0.4)',
            'rgba(212,255,146, 0.4)',
            'rgba(190,220,255, 0.4)',
            'rgba(255,219,149, 0.4)',
            'rgba(36,43,53, 0.4)'
        ],// Color del borde
        borderWidth: 1,// Ancho del borde
    };
    new Chart($grafico, {
        type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
        data: {
            labels: etiquetas,
            datasets: [
                datosIngresos,
                // Aquí más datos...
            ]
        },
    });
}

const resultadosLista = document.querySelector(".resultados .resultados__lista");


function mostrarGraficoNumeros(arreglo) {

    resultadosLista.innerHTML = "";

    if (arreglo.length > 0) {
        for(let i=0; i<arreglo.length; i++) {
            resultadosLista.innerHTML += `
                <li class="resultados__li">
                    <div class="resultados__header">
                        <div class="resultados__circulo">${arreglo[i][1]}</div>
                        <div class="resultados__triangulo"></div>
                    </div>
                    <p class="resultados__p">
                        ${arreglo[i][0]}
                    </p>
                </li>
            `;
        }
    }
    else {
        resultadosLista.innerHTML = `
            <li class="blockProcesos__contenedor blockProcesos__contenedor--eliminar">
                <div class="blockProcesos__div">
                    <i class="fa-solid fa-face-frown blockProcesos__i"></i>
                    <span class="blockProcesos__span">Ningún resultado por mostrar</span>
                </div>
            </li>
        `;
    }
}


const resultadosCambiar = document.querySelector(".resultados .resultados__cambiar");

resultadosCambiar.addEventListener("click", () => {
    resultadosCambiar.parentNode.classList.toggle("block__principal--activo");
})

// ! SECCION DE AGENDAR CITA

const btnAgendarCita = document.querySelector(".agendaCita .agendaCita__btnAgenda");

const industria = document.querySelector("#industria").textContent;
const inputFecha = document.getElementById('fecha');

const fechaActual = new Date().toLocaleDateString('es-PE', {timeZone: 'America/Lima'});
const horaPeru = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour12: false });

const selectHora = document.getElementById('hora');
const opcionesHora = selectHora.querySelectorAll('option');

// ! No poner dias anteriores a hoy

const [dia, mes, año] = fechaActual.split('/');

if (parseInt(horaPeru.split(':')[0]) < parseInt(opcionesHora[opcionesHora.length-1].value.split(':')[0])) {
    inputFecha.min = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    inputFecha.value = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    validarHora()
} else {
    inputFecha.min = `${año}-${mes.padStart(2, '0')}-${parseInt(dia.padStart(2, '0')) + 1}`;
    inputFecha.value = `${año}-${mes.padStart(2, '0')}-${parseInt(dia.padStart(2, '0')) + 1}`;
}


// ! Validar que no ingrese sabados ni domingos

function esFinDeSemana(fecha) {
    var dia = fecha.getDay();
    return (dia === 6 || dia === 5); // 6 es sábado, 5 es domingo
}
  
// Agregar un listener de eventos de cambio al input de fecha
inputFecha.addEventListener('change', function() {
    var fechaSeleccionada = new Date(this.value);
    if (esFinDeSemana(fechaSeleccionada)) {
      alert('No se puede seleccionar sábado ni domingo.');
      this.value = ''; // Limpiar el valor del input
    }
});

let inputNombre = document.querySelector("#nombre");
let usuario = document.querySelector("#usuario");


// ! No se muestren las horas pasadas

window.addEventListener('DOMContentLoaded', function() {

    inputFecha.addEventListener('change', function() {

        // Habilitar todas las opciones de hora si la fecha seleccionada es diferente a la fecha actual
        if (this.value !== `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`) {
            opcionesHora[0].selected = true
            for (let i = 0; i < opcionesHora.length; i++) {
                opcionesHora[i].disabled = false;
            }
        } 
        else {
            validarHora()
        }
    });

});

function validarHora() {
    let encontrado = false;
    
      // Deshabilitar opciones de hora que ya han pasado
      for (let i = 0; i < opcionesHora.length; i++) {
        let horaOpcion = parseInt(opcionesHora[i].value.split(':')[0]);
        if (horaOpcion <= horaPeru.split(':')[0]) {
            opcionesHora[i].disabled = true;
            opcionesHora[0].selected = false;
        } else {
            opcionesHora[i].disabled = false;
            if(!encontrado) {
                opcionesHora[i].selected = true;
                encontrado = true;
            }
        }
      }
    
}


// ! Agendar

btnAgendarCita.addEventListener("click", ()=>{
    agendarCita()
    mostrarMensajeEnviado()
})


// ! Generar detalles


let detallesGeneral = "";

function generarDetallesCita() {
    let contador = 0;

    let detalles = `CRITERIOS\n\n`;

    for(let i=0; i<criterios.length; i++) {
        if(criterios[i][1]) {
            detalles += `• ${criterios[i][0]}\n`
        }
    }

    detalles += `\nPRIORIZACIÓN\n\n`;

    let resultados = [];

    for(let i=0; i<suma.length; i++) {
        for(let j=0; j<priorizacion.length; j++) {
            if (suma[i][0] == priorizacion[j].proceso) {
                detalles += `• Proceso ${i+1}:\n\nÁrea: ${priorizacion[j].area}\n`;
                detalles += `Nombre: ${suma[i][0]}\n`;
                detalles += `Puntaje: ${suma[i][1]}\n\n`

                let arreglo = [];
                
                arreglo.push(suma[i][0]);
                arreglo.push(suma[i][1]);

                resultados.push(arreglo)

                contador = i;
            }
        }
    }

    console.log(resultados)

    mostrarGrafico(resultados)
    mostrarGraficoNumeros(resultados)

    contador++;

    detalles += `\nAUTOMATIZACIÓN\n\n`;

    for(let i=contador; i<carrito.children.length; i++) {
        let texto = carrito.children[i].querySelector("p").innerHTML.replace(/\s+/g, ' ').trim();
        let area = carrito.children[i].querySelector("strong").innerHTML.replace(/\s+/g, ' ').trim();

        detalles += `• Proceso ${i+1}:\n\nÁrea: ${area}\n`;
        detalles += `Nombre: ${texto}\n\n`;
    }

    detallesGeneral = detalles;
}

function formatearFecha(fecha) {
    return fecha < 10 ? '0' + fecha : fecha;
}

// ! Generar URL

function agendarCita() {

    let hora = selectHora.value;
    let horaInicio = hora.replace(":", "");
    let horaFin = `${parseInt(hora.split(':')[0]) + 1}${hora.split(':')[1]}`;

    let fecha = inputFecha.value.replaceAll("-", "");

    //

    let nombre = inputNombre.value;
    
    if(nombre == ""){
        nombre = "Usuario";
    }

    let detalles = `Nombre: ${nombre}\n\n\n`;
    detalles += detallesGeneral;

    let detallesFinal = detalles.replaceAll(" ", "+").replaceAll("\n", "%0A");

    let url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Reunión:+Automatización+para+la+industria+de+${industria}&dates=${fecha}T${horaInicio}0000-0500/${fecha}T${horaFin}0000-0500&details=${detallesFinal}&add=leonidas.yauri%40dignita.tech&remind=0`;

    window.open(url, "_blank");

}


// ! SECCION MENSAJE ENVIADO

function mostrarMensajeEnviado() {
    let nombre = inputNombre.value;
    if(nombre == ""){
        usuario.innerHTML = "Usuario";
    } else {
        usuario.innerHTML = nombre;
    }

    // Mover el slider
    animacionEncabezado();
    slider.style.marginLeft = `-${seccionActual*100}%`;
    seccionActual++;
    validarBotones();
    modificarSteps();
}

// ! PANTALLA

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
