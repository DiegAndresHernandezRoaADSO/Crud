import solicitud from "../Crud/ajax.js";
import isvalid from "../Crud/isvalid.js";
import SoloLetras from "../Crud/module3.js";
import remover from "../Crud/remover.js";


const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");

$formulario.addEventListener(`submit`, (event)=>{
    isvalid(event, "form > [required]")
});

nombre.addEventListener("keyup", (event) => {
    remover(event, nombre);
});

nombre.addEventListener("keypress", (event) =>{
    SoloLetras(event, nombre)
})


$formulario.addEventListener("submit", (event)=>{
    let response = isvalid(event, "from[required]");
    const data ={
        name: nombre.value,
    }
    if (response) {
        fetch('http://localhost:3000/user',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then(json =>{
        nombre.value = " " ;
        Button.removeAtribute("disabled")
    })
}
});






















