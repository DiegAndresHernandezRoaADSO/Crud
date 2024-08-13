import { URL } from "./config.js";

const solicitud = async () => {
    let solicitar = await fetch(`${URL}/users`);
    let respuesta = await solicitar.json()
    return respuesta;
}

export default solicitud;
