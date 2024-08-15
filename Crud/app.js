// importanciones

import { isEmail } from "./module.js";
import SoloLetras from "./module3.js";
import { SoloNumeros } from "./module2.js";
import is_valid from "./isvalid.js";
import remover  from "./remover.js";
import solicitud, {enviar }from "./ajax.js";
import { URL } from "./config.js";

// variables 

// Selecciona el primer formulario (<form>) en el documento HTML. Lo asigna a la variable $formulario
const $formulario = document.querySelector("form");

// Selecciona los elementos del formulario por su ID. Cada uno se asigna a una variable
const nombres = document.querySelector("#nombres");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipodocumento = document.querySelector("#tipodocumento");
const documento = document.querySelector("#documento");
const correo = document.querySelector("#correo");
const politicas = document.querySelector("#politicas");
const boton = document.querySelector("#boton");
const tbody = document.querySelector("tbody");
const id = document.querySelector("#user");



// TEMPLATE, // Obtener el template y su contenido
const $template = document.querySelector("#template").content;

// FRAGMENTOS
const $fragmento = document.createDocumentFragment();


//  Se añade un listener al formulario que llama a la función validar cuando se intenta enviar el formulario.
$formulario.addEventListener("submit", (event) => {
    let response = is_valid(event, "form [required]")
    // para hacer las peticiones 
    // En lugar de pasar la ruta al recurso que deseas solicitar a la llamada del método fetch(), puedes crear un objeto de petición
    // capturar todos los atributos

    const data = {
        // nombres: nombres.value,
        // apellidos: apellidos.value,
        // telefono: telefono.value,
        // direccion: direccion.value,
        // tipodocumento: tipodocumento.value,
        // documento: documento.value,
        // correo: correo.value
    }
    if (response) {
        fetch(`${URL}/users`, {
          method: 'POST',
          body: JSON.stringify(data), // se transforma a un json
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json()) // se vuelve un objeto de js
        .then(data => {
            console.log(data);
            nombres.value = "";
            apellidos.value = "";
            telefono.value = "";
            direccion.value = "";
            documento.value = "";
            correo.value = "";

            nombres.classList.remove("correcto");
            apellidos.classList.remove("correcto");
            telefono.classList.remove("correcto");
            direccion.classList.remove("correcto");
            documento.classList.remove("correcto");
            correo.classList.remove("correcto");

            politicas.checked = false;

            tipodocumento.value = "";
            tipodocumento.classList.remove("correcto");

            alert("Señor usuario tus datos fueron enviados exitosamente");

            createRow(data);
            
        })
        .catch(error => {
            alert("Señor usuario tus datos no fueron enviados");
            console.error("error")
        })
        .finally(() => {
            document.querySelector("#boton").disabled = false; // Habilitar el boton
        });
        document.querySelector("#boton").disabled = true; // Desabilitar el boton
    }
});

// GET se utiliza para obtener un recurso especifico del servidor
// POST se utiliza para crear un nuevo recurso en el servidor
// PUT se utiliza para actualizar un recurso exitente en el servidor
// DELETE se utiliza para eliminar un resurso especifico del servidor 

// keydown -- cuando ecribo tecla por tecla 
// keypress -- cuando la presiono
// keyup -- cuando la oprimo 

// Se añade un listener para el evento keyup en cada uno de los campos. Cuando se suelta una tecla, se llama a la función remover para verificar el estado del campo.
[nombres, apellidos, correo, telefono, direccion, documento].forEach(input => {
    input.addEventListener("keyup", () => {
        remover(input);
    });
});


// Manejar el cambio en el tipo de documento
// Al cambiar el valor del tipo de documento, se verifica si es diferente de "0". Se actualiza el estado visual del campo según corresponda.
tipodocumento.addEventListener("change", () => {
    if (tipodocumento.value === "") {
        // Si el valor es "0", significa que no se ha seleccionado un tipo de documento
        tipodocumento.classList.add("error");
        tipodocumento.classList.remove("correcto");
    } else {
        // Si el valor no es "0", significa que se ha seleccionado un tipo de documento
        tipodocumento.classList.remove("error");
        tipodocumento.classList.add("correcto");
    }
});

// AGREGANDO LA NUEVA OPTION AL SELECT
const documentos = () => {
    const fragment = document.createDocumentFragment();
    fetch('http://localhost:3000/documento')
    .then((response) => response.json())
    .then((data) => {

        let optiondeterminada = document.createElement("option"); // crear la opcion por defecto
        optiondeterminada.value = ""; // valor vacio para la opcion por defecto 
        optiondeterminada.textContent ="Selecciona el tipo de documento...";
        optiondeterminada.select = true; // para que quede selecciona como predeterminada
        fragment.appendChild( optiondeterminada); // se agrega la opcion por defecto al fragemen

        data.forEach(element => {
            console.log(element);
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.nombre;
            fragment.appendChild(option);
        });
        tipodocumento.appendChild(fragment);
    })
}

// LISTAR LOS USUARIOS 
const listarUsuarios = async () => {
    const data = await solicitud("users")
    const losdocumentos = await solicitud("documento");



        data.forEach(element => {
        let nombre = losdocumentos.find((documento) => documento.id === element.tipodocumento).nombre
        console.log(nombre);

       // Llenar los datos del usuario en el template clonado
       $template.querySelector('.nombre').textContent = element.nombres;
       $template.querySelector('.apellidos').textContent = element.apellidos;
       $template.querySelector('.correo_Electrónico').textContent = element.correo;
       $template.querySelector('.teléfono').textContent = element.telefono;
       $template.querySelector('.dirección').textContent = element.direccion;
       $template.querySelector('.tipo_de_documento').textContent = element.tipodocumento;
       $template.querySelector('.número_de_documento').textContent = element.documento;


       $template.querySelector(".modificar").setAttribute("data-id", element.id);
       $template.querySelector(".eliminar").setAttribute("data-id", element.id);


       // se clona el contenido del template que se esta usando

       const clone = document.importNode($template, true);
       $fragmento.appendChild(clone);
    });
    tbody.appendChild($fragmento);
}







const createRow = (data) => {
    const tr = tbody.insertRow(-1);

    const tdnombre = tr.insertCell(0);
    const tdapellidos = tr.insertCell(1);
    const tdcorreo_Electrónico = tr.insertCell(2);
    const tdteléfono = tr.insertCell(3);
    const tddirección= tr.insertCell(4);
    const tdtipo_de_documento = tr.insertCell(5);
    const tdnúmero_de_documento = tr.insertCell(6);


    tdnombre.textContent = data.nombres;
    tdapellidos.textContent = data.apellidos;
    tdcorreo_Electrónico.textContent = data.correo;
    tdteléfono.textContent = data.telefono;
    tddirección.textContent = data.direccion;
    tdtipo_de_documento.textContent = data.tipodocumento;
    tdnúmero_de_documento.textContent = data.documento;

}

const buscar = async(element) => {
    let data = await enviar(`users/${element.dataset.id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    loadform(data);
};

    
const save = (event)=>{
    let response = is_valid(event, "from [required]");
    const data={
        nombres: nombres.value,
        apellidos:apellidos.value,
        direccion:direccion.value,
        tipodocumento:tipodocumento.value,
        correo:correo.value,
        telefono:telefono.value,
        documento:documento.value
    }

    if(response){
        if(user.value === ""){
            guardar(data)
        }else{
            actualiza(data)
        }
    }
} 
const guardar =(data) =>{
    console.log(data);

    return
    fetch(`${URL}/users`,{
        method: `POST`,
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },    
    })
    .then((response)=> response.json())
    .then((json)=>{
        //codigo
        nombres.value = "";
        createRow(json)
    })
}

const actualiza= async(data)=>{
    const response = await enviar(`users/${user.value}`,{
        method: 'PUT',
        body: JSON. stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    //limpiar form

    nombres.value = " ";

    console.log(response);
}


const limpiarFomr = ()=>{
    nombres.value = "";
    nombres.value = "";
    nombres.value = "";
    nombres.value = "";
    nombres.value = "";
}


const  loadform = (data)=>{
    const {

        id:user_id,
        nombres : name,
        apellidos : last_name,
        telefono : phone,
        direccion: addres,
        tipodocumento : type,
        documento : document,
        correo : email
    } = data;


    user.value = id;
    nombres.value = name;
    apellidos.value = last_name;
    telefono.value = phone;
    direccion.value = addres;
    tipodocumento.value = type;
    documento.value = document;
    correo.value = email;
    politicas.value = true;
    button.removeAttribute("disabled");   

}



// Manejar el estado del botón de enviar según el checkbox
addEventListener("DOMContentLoaded", (event) => {
    documentos();
    listarUsuarios();
    if(!politicas.checked) {
        boton.setAttribute("disabled", "");
    }
});

politicas.addEventListener("change", function (e) {
    if (e.target.checked) {
        boton.removeAttribute("disabled");
    } 
});

// Agrega el evento de submit al formulario
// document.querySelector("form").addEventListener("submit", validar);

// Validaciones específicas

// Validación del documento
documento.addEventListener("keypress", SoloNumeros);

// Validación del telefono
telefono.addEventListener("keypress", SoloNumeros);

$formulario.addEventListener("submit", save);



// Validación del nombre 
nombres.addEventListener("keypress", (event) => {
    SoloLetras(event, nombres);
});

// Validación del apellido
apellidos.addEventListener("keypress", (event) => {
    SoloLetras(event, apellidos);
});

// Validación del correo electrónico
correo.addEventListener("blur", (event) => {
    isEmail(event, correo);
});


document.addEventListener("click", (event) => {
    if(event.target.matches(".modificar")){
        buscar(event.target);
    }
});















