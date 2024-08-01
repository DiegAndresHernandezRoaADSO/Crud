const dom =document;
const letters =(event)=>{
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(letras.test(event.key)) event.prevenDefault();
}

export default letters;
