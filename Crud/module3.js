export const SoloLetras = (event, elemento) => {
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (letras.test(event.key)) {
        console.log("Sí");
    } else {
        console.log("No");
        event.preventDefault();
    }
};

export default SoloLetras;



