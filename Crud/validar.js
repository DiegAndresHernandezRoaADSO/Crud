 export const validar = (event) => {
    event.preventDefault();
     if (nombre.value === "") {
         nombre.focus();
         nombre.classList.add("error");
     }
     if (apellido.value === "") {
         apellido.focus();
         apellido.classList.add("error");
     }
     if (telefono.value === "") {
         telefono.focus();
        telefono.classList.add("error");
     }
     if (direccion.value === "") {
         direccion.focus();
         direccion.classList.add("error");
     }
     if (tipo.value === "") {
         tipo.focus();
         tipo.classList.add("error");
     }
     if (documento.value === "") {
         documento.focus();
        documento.classList.add("error");
     }
     if (email.value === "") {
         email.focus();
         email.classList.add("error");
    }
}


export default validar;