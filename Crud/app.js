import is_letters from "./modules/is_letters.js";
import isEmail from "./modules/is_email.js";
import is_number from "./modules/is_number.js";
import remover from "./modules/remove.js";
import is_valid from "./modules/is_valid.js";
import solicitud, { enviar } from "./modules/ajax.js";
import is_empty from "./modules/is_empty.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const correo = document.querySelector("#email");
const button = document.querySelector("button");
const fragmento = document.createDocumentFragment();
const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");
const $template = document.getElementById("users").content;
const user = document.querySelector('#user_id');

const cantidad = (elemento) => {
  let valor = elemento.value.length === 10;
  if (valor) {
    elemento.classList.remove("error");
    elemento.classList.add("correcto");
  } else {
    elemento.classList.remove("correcto")
    elemento.classList.add("error")
  }
}

const documentos = () => {
  const fragmento = document.createDocumentFragment();
  let option = document.createElement("option");
  option.value = "";
  option.textContent = "Seleccione...";
  fragmento.appendChild(option);
  solicitud("documents")
    .then((data) => {
      data.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        fragmento.appendChild(option);
      });
      tipo.appendChild(fragmento);
    });
}

const listar = async (page) => {  
  
  const _page = page ? page :1;
  const data = await solicitud(`users?_page${_page}=1&_per_page=25`);
  const documentos = await solicitud("documents");


  const nav = document.querySelector(".navegador");

  const first = data.first;
  const prev = data.prev;
  const next = data.next;
  const last = data.last;


  // nav.querySelector(".first").setAttribute("disabled"," ");
  // nav.querySelector(".prev").setAttribute("disabled"," ");


  nav.querySelector(".first").setAttribute("data-first",first );
  nav.querySelector(".prev").setAttribute("data-prev", last);
  nav.querySelector(".next").setAttribute("data-next",next );
  nav.querySelector(".last").setAttribute("data-last", last);

  console.log(nav);


  




  
  

  data.forEach((element) => {
    $template.querySelector("tr").id = `user_${element.id}`;
    $template.querySelector(".first_name").textContent = element.first_name;
    $template.querySelector(".last_name").textContent = element.last_name;
    $template.querySelector(".phone").textContent = element.phone;
    $template.querySelector(".address").textContent = element.address;
    $template.querySelector(".type_id").textContent = element.type_id;
    $template.querySelector(".document").textContent = element.document;
    $template.querySelector(".email").textContent = element.email;

    $template.querySelector(".edit").setAttribute("data-id", element.id);
    $template.querySelector(".delete").setAttribute("data-id", element.id);

    let clone = document.importNode($template, true);
    fragmento.appendChild(clone);
  }); 
  table.querySelector('tbody').appendChild(fragmento)
}

const Guardar = (event) => {
  let ok = is_valid(event, "form  [required]");
  //  Capturar todos los atributos
    const data = {
      first_name: nombre.value.trim(),
      last_name: apellido.value.trim(),
      address: direccion.value.trim(),
      type_id: tipo.value,
      email: correo.value,
      phone: telefono.value,
      docuement: documento.value,
  };
  
  if (ok) {

    // Preguntamos si el formulario tiene usuario
    if (user.value === "") {
        // Creamos un usuario
        enviar("users", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((data) => {
          createRow(data);
          resetForm();
          alert(`Usuario creado con éxtio`);
        });
    } else {
      // Actualizamos los datos
      data.id = user.value;
      enviar(`users/${user.value}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((data) => {
        resetForm();
        editFila(data);
        alert(`Usuario actualizado con éxtio`);
      });
    }
  }
}

const editar = (event, element) => {   
    enviar(`users/${element.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      // console.log(data);
      loadForm(data)
    });
}

const deleteData = (event, element) => {
  const tr = element.parentNode.parentNode.parentNode;
  if (confirm("¿Desea eliminar el registro?")) {
    enviar(`users/${element.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      alert(`El usuario ${data.first_name} fue eliminado exitosamente`);
      tr.remove();
    });
  }
};

const createRow = (data) => {

  const tr = tbody.insertRow(-1);  
  const tdNombre = tr.insertCell(0);
  const tdApellido = tr.insertCell(1);
  const tdTelefono = tr.insertCell(2);
  const tdDireccion = tr.insertCell(3);
  const tdTipo = tr.insertCell(4);
  const tdDocumento = tr.insertCell(5);
  const tdEmail = tr.insertCell(6);
  const tdBotonera = tr.insertCell(7);

  tdNombre.classList.add("first_name");
  tdApellido.classList.add("last_name");;
  tdTelefono.classList.add("phone");
  tdDireccion.classList.add("address");
  tdTipo.classList.add("type_id");
  tdDocumento.classList.add("docuement");
  tdEmail.classList.add("email");

  tdNombre.textContent = data.first_name;
  tdApellido.textContent = data.last_name;
  tdDireccion.textContent = data.address;
  tdTipo.textContent = data.type_id;
  tdEmail.textContent = data.email;
  tdTelefono.textContent = data.phone;
  tdDocumento.textContent = data.docuement;

  const div = document.createElement("div");
  const btnEdit = document.createElement("button");
  const btnDelete = document.createElement("button");
  const iconEdit = document.createElement("i");
  const iconDelete = document.createElement("i");

  div.classList.add("group");
  btnDelete.classList.add("delete", "button", "button--danger");
  btnEdit.classList.add("editar", "button");

  btnEdit.setAttribute("data-id", data.id);
  btnDelete.setAttribute("data-id", data.id);

  btnEdit.appendChild(iconEdit);
  btnDelete.appendChild(iconDelete);

  div.appendChild(btnEdit);
  div.appendChild(btnDelete);

  tdBotonera.appendChild(div);

  tr.id = `user_${data.id}`; 
}

const editFila = (data) => {
  const {
    id,
    first_name,
    last_name,
    phone,
    address,
    type_id,
    docuement,
    email,
  } = data;

  const tr = document.querySelector(`#user_${id}`);  
  tr.querySelector(".first_name").textContent = first_name;  
  tr.querySelector(".last_name").textContent = last_name;
  tr.querySelector(".phone").textContent = phone;
  tr.querySelector(".address").textContent = address;
  tr.querySelector(".type_id").textContent = type_id;
  tr.querySelector(".docuement").textContent = docuement;
  tr.querySelector(".email").textContent = email;  
  
}

const resetForm = () => {
  nombre.classList.remove("correcto");
  apellido.classList.remove("correcto");
  telefono.classList.remove("correcto");
  direccion.classList.remove("correcto");
  tipo.classList.remove("correcto");
  correo.classList.remove("correcto");
  documento.classList.remove("correcto");

  user.value = "";
  nombre.value = "";
  apellido.value = "";
  direccion.value = "";
  tipo.selectedIndex = 0;
  correo.value = "";
  telefono.value = "";
  documento.value = "";
  politicas.checked = false;
  
  button.setAttribute("disabled", "");
}

const loadForm = (data) => {
  const {id,first_name, last_name, phone, address, type_id, docuement, email } = data;
  
  user.value = id;
  nombre.value = first_name;
  apellido.value = last_name;
  telefono.value = phone;
  direccion.value = address;
  tipo.value = type_id;
  documento.value = docuement;
  correo.value = email;
  politicas.checked = true;
  button.removeAttribute("disabled");
  
}


addEventListener("DOMContentLoaded", (event) => {
  documentos();
  listar();
  if (!politicas.checked) {
    button.setAttribute("disabled", "");
  }
});

// Delegación de eventos
document.addEventListener("click", (e) => {
  let element = "";
  if (e.target.matches(".edit") || e.target.matches(".edit *")) {
    element = e.target.matches(".edit") ? e.target : e.target.parentNode;
    editar(e, element);
  }
  if (e.target.matches(".delete") || e.target.matches(".delete *")) {
    element = e.target.matches(".delete") ? e.target : e.target.parentNode;
    deleteData(e, element);
  }
  if(e.target.matches(".first")){
    const nodos = tbody;
    const first = e.target.dataset.first;
    while(nodos.firstChild){
      nodos.removeChild(nodos.firstChild)
    }
    listar(first);
  }
  if(e.target.matches(".prev")){
    const nodos = tbody;
    const prev = e.target.dataset.prev;
    while(nodos.firstChild){
      nodos.removeChild(nodos.firstChild)
    }
    listar(prev);

  }
  if(e.target.matches(".next")){
    const nodos = tbody;
    const next = e.target.dataset.next;
    while(nodos.firstChild){
      nodos.removeChild(nodos.firstChild)
    }
    listar(next);

  }
  if(e.target.matches(".last")){
    const nodos = tbody;
    const last = e.target.dataset.last;
    while(nodos.firstChild){
      nodos.removeChild(nodos.firstChild)
    }
    listar(last);

  }
});

politicas.addEventListener("change", function (e) {
  if (e.target.checked) {
    button.removeAttribute("disabled")
  }
});

$formulario.addEventListener("submit", Guardar);

nombre.addEventListener("blur", (event) => {
  is_empty(event, nombre);
})

apellido.addEventListener("blur", (event) => {
  remover(event, apellido)
});

telefono.addEventListener("blur", (event) => {
  cantidad(telefono);
  is_empty(event, telefono);
});

correo.addEventListener("blur", (event) => {
  isEmail(event, correo);
});

direccion.addEventListener("blur", (event) => {
  is_empty(event, direccion);
});

documento.addEventListener("blur", (event) => {
  is_empty(event, documento);
});

tipo.addEventListener("change", (event) => {
  remover(event, tipo);
})

nombre.addEventListener("keypress", (event) => {
  remover(event, nombre);
});

// Cuando pulsamos la tecla
documento.addEventListener("keypress", is_number);

telefono.addEventListener("keypress", is_number);

nombre.addEventListener("keypress", event => {
  is_letters(event, nombre)
});

apellido.addEventListener("keypress", (event) => {
  is_letters(event, apellido)
});

// Mientras mantenemos pulsada la tecla
documento.addEventListener("keydown", function (event) {
  // console.log("keydown", event);
});

// Cuando soltamos la tecla
documento.addEventListener("keyup", function (event) {
  // console.log("keyup", event);
});