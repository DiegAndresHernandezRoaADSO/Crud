import isvalid from "./isvalid.js";
import isEmail from "./module.js";
import SoloNumeros from "./module2.js";
import SoloLetras  from "./module3.js";
import remover from "./remover.js"
import solicitud from "./ajax.js";

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


const documentos = () =>{
    const fragmento = document.createDocumentFragment();
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => console.log(json));
    data.array.forEach(element => {
        console.log(element);
        let option = document.createComment("option");
        option.value = element.id;
        option.textContent = element.name
        fragmento.appendChild(option)
    });
    tipo.appendChild(fragmento)
}

const listar = () =>{
    fetch('')
    .then((response) => response.json())
    .then((json) => console.log(json));

}

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
        nombre.value = "" ;
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



document.addEventListener("DOMContentLoaded", (event) => {
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