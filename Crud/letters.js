export default letters;

const letters = (event) => {

    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!letras.test(event.key)) {
        event.preventDefault(); 
    }
};

