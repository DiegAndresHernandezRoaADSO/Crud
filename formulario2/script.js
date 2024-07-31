
const $formulario = document.querySelector('form');
const nombre = document.querySelector("#nombre");

$formulario.addEventListener("submit", (event)=>{
    let response = isvalid(event, "from[required]");
    const data ={
        first_name: nombre.value,
    }
    if (response) {
        fetch('http://localhost:3000/user',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    }
})