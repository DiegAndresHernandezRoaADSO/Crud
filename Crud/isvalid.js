const isvalid = (event, form)=>{
    event.preventDefault();
    const elements = document.querySelectorAll(form);
    let bandera = true
    elements.forEach(element =>{
        if(element.value === ""){
            element.classList.add ("error");
            bandera = false;
        }
        else{
            element.classlit.remove ("error");
            element.classList.add("correcto")
        }
        
    })
    return bandera;
    
    if(bandera){
        alert("datos guardados");
    }
    else{
        alert("formulario vacio");
    }

    
}

export default isvalid;
