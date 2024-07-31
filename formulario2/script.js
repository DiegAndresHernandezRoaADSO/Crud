function añardir_elemento(){
    let aficiones = document.getElementById("tipo");
    let inputAficion = document.getElementById("inputAficion").value;
    let option = document.createElement("option");
    option.text = inputAficion;
    aficiones.add(option);
    }
