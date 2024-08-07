const isvalid = (event, form) => {
    event.preventDefault();
    const elements = document.querySelectorAll(`${form} [required]`); // Asegúrate de seleccionar solo campos requeridos
    let isValid = true;

    elements.forEach(element => {
        if (element.value.trim() === "") {
            element.classList.add("error");
            element.classList.remove("correcto");
            isValid = false;
        } else {
            element.classList.remove("error");
            element.classList.add("correcto");
        }
    });

    return isValid;
};

export default isvalid;
