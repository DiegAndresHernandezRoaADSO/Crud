const letters = (event) => {
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!letras.test(event.key)) {
        event.preventDefault(); // Corrige el error de typo
    }
};

export default letters;
