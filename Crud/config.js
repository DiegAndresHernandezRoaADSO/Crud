export  const URL = `http://localhost:3000/user`;

const solicitud = async (url) =>{
    let solicitud = await fetch(`${URL}/${url}`);
    let data = await solicitud.json();
    return data;
}

export default solicitud