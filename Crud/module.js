const isEmail =(event, elemento)=>{
    let expresion = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/;
    console.log(expresion,elemento.value);
    console.log(expresion.test(elemento.value));
    if(expresion.test(elemento.value)){
        elemento.classlist.remove("error");
        elemento.classlist.add("correcto")
    }else{
        elemento.classlist.remove("correcto");
        elemento.classlist.add("error")
    };
};

export default isEmail;