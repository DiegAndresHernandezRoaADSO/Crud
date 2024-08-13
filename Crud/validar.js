const quitarclase = (input) => {
    input.classList.remove('error');
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = "";
    }
};

const validar = (event) => {
    event.preventDefault();
    let valid = true;
    if (nombre.value === "") {
        nombre.focus();
        nombre.classList.add("error");
        document.querySelector("#nombre-error").textContent = "Por favor, ingresa tus nombres";
        valid = false;
    } else {
        quitarclase(nombre);
    }
    if (apellido.value === "") {
        apellido.focus();
        apellido.classList.add("error");
        document.querySelector("#apellido-error").textContent = "Por favor, ingresa tu apellido";
        valid = false;
    } else {
        quitarclase(apellido);
    }
    if (telefono.value === "") {
        telefono.focus();
        telefono.classList.add("error");
        document.querySelector("#telefono-error").textContent = "Por favor, ingresa tu número de teléfono";
        valid = false;
    } else {
        quitarclase(telefono);
    }

    if (direccion.value === "") {
        direccion.focus();
        direccion.classList.add("error");
        document.querySelector("#direccion-error").textContent = "Por favor, ingresa tu dirección";
        valid = false;
    } else {
        quitarclase(direccion);
    }

    if (tipo.value === "") {
        tipo.focus();
        tipo.classList.add("error");
        document.querySelector("#tipo-error").textContent = "Por favor, selecciona un tipo";
        valid = false;
    } else {
        quitarclase(tipo);
    }

    if (documento.value === "") {
        documento.focus();
        documento.classList.add("error");
        document.querySelector("#documento-error").textContent = "Por favor, ingresa el número de documento";
        valid = false;
    } else {
        quitarclase(documento);
    }

    if (email.value === "") {
        email.focus();
        email.classList.add("error");
        document.querySelector("#email-error").textContent = "Por favor, ingresa tu correo electrónico";
        valid = false;
    } else {
        quitarclase(email);
    }

    return valid; 
};


if(!politicas.checked){
    document.querySelector("#politicas-error").textContent = "Debes aceptar las políticas de uso";
    valid = false;
}else{
    document.querySelector("#politicas-error").textContent = "";
}


if(valid){
    alert("formulario enviado")
}




export const remover = (input)=>{
    if(input.value !== ""){
        input.classList.add("correcto");
        input.classList.remove("error");
    }else{ñ
        input.classList.remove("correcto");
        input.classList.add("error");
    }
}
