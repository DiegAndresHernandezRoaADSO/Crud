const validar = (event) => {
    event.preventDefault();
    if (nombre.value === "") {
        nombre.focus();
        nombre.classList.add("error");
    } else if (apellido.value === "") {
        apellido.focus();
        apellido.classList.add("error");
    } else if (telefono.value === "") {
        telefono.focus();
        telefono.classList.add("error");
    } else if (direccion.value === "") {
        direccion.focus();
        direccion.classList.add("error");
    } else if (tipo.value === "") {
        tipo.focus();
        tipo.classList.add("error");
    } else if (documento.value === "") {
        documento.focus();
        documento.classList.add("error");
    } else if (email.value === "") {
        email.focus();
        email.classList.add("error");
    }
};

export default validar;
