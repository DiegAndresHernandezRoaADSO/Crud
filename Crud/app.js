import isvalid from "./isvalid.js";
import isEmail from "./module.js";
import SoloNumeros from "./module2.js";
import SoloLetras  from "./module3.js";
import remover from "./remover.js"
import solicitud from "./ajax.js";
import { URL } from "./config.js";

const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const email = document.querySelector("#email");
const button = document.querySelector("button");
const tbusers = document.querySelector("#tbusers");
const fragmento = document.createDocumentFragment("");
const tbody = document.querySelector("tbody");
console.log(tbody);



const documentos = () => {
    const fracmento = document.createDocumentFragment();
    fetch('http://localhost:3000/documento')
    .then((response) => response.json())
    .then((data) => {
        let option = document.createElement('option');
        option.textContent = 'seleccione ...';
        option.value = ''
        fracmento.appendChild(option);
            data.forEach(element =>{
            let option = document.createElement('option');
            option.value = element.id;
            option.textContent = element.name
            fracmento.appendChild(option);
        });
        tipo_Documento.appendChild(fragmento);
    });
}



const listar = async () =>{
    const data = await solicitud("users");
    data.forEach(element =>{
        tbusers.querySelector(".nombre").textContent = element.first_name;
        tbusers.querySelector(".apellido").textContent = element.last_name;
        tbusers.querySelector(".direccion").textContent = element.address;
        tbusers.querySelector(".tipo").textContent = element.tipo;
        tbusers.querySelector(".email").textContent = element.email;
        tbusers.querySelector(".phone").querySelector = element.phone;
        tbusers.querySelector(".documento").querySelector = element.document;

        const clone = document.importNode(tbusers, true);
        fragmento.appendChild(clone);
    })

    tbody.appendChild(fragmento);
}

 const createRow = (data) =>{
    const tr = tbody.insertRow(-1);

    const tdNombre = tr.insertCell(0);
    const tdApellido = tr.insertCell(1);
    const tdtelefono = tr.insertCell(2);
    const tdDireccion = tr.insertCell(3)
 }

document.addEventListener("DOMContentLoaded", (event) => {
    listar();
    documentos();
    if (!politicas.checked) {
        button.setAttribute("disabled", "");
    }
});

politicas.addEventListener("change", (event) => {
    if (event.target.checked) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
});

$formulario.addEventListener("submit", (event)=>{
    let response = isvalid(event, "from[required]");
    const data ={
        first_name: nombre.value,
        last_name: apellido.value,
        address:direccion.value,
        type_id: tipo.value,
        email: email.value,
        phone:telefono.value,
        document:documento.value
    }
    if (response) {
        fetch('http://localhost:3000/user',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response)=>{response.json})
    .then((json)=>{
        //codigo
        nombre.value = " " ;
    })
    }
})

$formulario.addEventListener('submit', (event =>{
    isvalid(event, "form > [required] ");
}));

nombre.addEventListener("keyup", (event) => {
    remover(event, nombre);
});

apellido.addEventListener("keyup", (event) => {
    remover(event, apellido);
});

telefono.addEventListener("keyup", (event) => {
    remover(event, telefono);
});

direccion.addEventListener("keyup", (event) => {
    remover(event, direccion);
});

tipo.addEventListener("change", (event) => {
    remover(event, tipo);
});

documento.addEventListener("keyup", (event) => {
    remover(event, documento);
});

email.addEventListener("keypress", (event) => {
    remover (event, email);
});



documento.addEventListener("keypress", SoloNumeros);

telefono.addEventListener("keypress", SoloNumeros);

nombre.addEventListener("keypress", (event) => {
    SoloLetras(event, nombre);
});

apellido.addEventListener("keypress", (event) => {
    SoloLetras(event, apellido);
});

email.addEventListener("blur", (event) => {
    isEmail(event, email);
});






