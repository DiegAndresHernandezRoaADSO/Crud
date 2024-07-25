// email
import isEmail from "./module.js";

// solo numeros
import solonumeros from "./module2.js";

// solo letras
import { SoloLetras } from "./module3.js";

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

const validar = (event) => {
    event.preventDefault();
    // if (nombre.value === "") {
    //     nombre.focus();
    //     nombre.classList.add("error");
    // }
    // if (apellido.value === "") {
    //     apellido.focus();
    //     apellido.classList.add("error");
    // }
    // if (telefono.value === "") {
    //     telefono.focus();
    //     telefono.classList.add("error");
    // }
    // if (direccion.value === "") {
    //     direccion.focus();
    //     direccion.classList.add("error");
    // }
    // if (tipo.value === "") {
    //     tipo.focus();
    //     tipo.classList.add("error");
    // }
    // if (documento.value === "") {
    //     documento.focus();
    //     documento.classList.add("error");
    // }
    // if (email.value === "") {
    //     email.focus();
    //     email.classList.add("error");
    // }
}

const remover = (e, input) => {
    if (input.value !== "") {
        input.classList.remove("error");
        input.classList.add("correcto");
    } else {
        input.classList.remove("correcto");
        input.classList.add("error");
    }
};

$formulario.addEventListener('submit', validar);

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

email.addEventListener("blur", (event) => {
    isEmail(event, email);
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

const SoloNumeros = function(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
    }
}



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








