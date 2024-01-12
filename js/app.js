
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

let blockProcesos = document.querySelector(".procesos .blockProcesos");

for (let i=0; i<blockProcesos.children.length; i++) {
    let nombreArea = blockProcesos.children[i].querySelector(".blockProcesos__span").innerHTML.replace("Área de ", "").toLowerCase();

    for (let j=0; j<areas.length; j++) {
        if (areas[j][0].toLowerCase() == nombreArea) {
            blockProcesos.children[i].setAttribute("data-nombre_area", `${nombreArea}`);
        }
    }
}


// Mostrar procesos de las areas seleccionadas

function mostrarProcesos() {
    for (let i=0; i<areas.length; i++) {

        for(let j=0; j<blockProcesos.children.length; j++) {
            let nombreArea = blockProcesos.children[j].getAttribute('data-nombre_area');

            if (areas[i][0].toLowerCase() === nombreArea) {
                if (areas[i][1]) {
                    blockProcesos.children[j].style.display = "block";
                } else {
                    blockProcesos.children[j].style.display = "none";
                }
            }
        }
        
    }
}

mostrarProcesos()


// Seleccionar procesos

const procesos = document.querySelectorAll(".blockProcesos__proceso");

for (let i=0; i<procesos.length; i++) {
    procesos[i].addEventListener("click", ()=>{
        procesos[i].classList.toggle("blockProcesos__proceso--seleccionado");
    })
}