import { URL } from "../config.js";

const solicitud = async (endpoint) => {
  try {
    let response = await fetch(`${URL}/${endpoint}`);
    let data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const enviar = async (endpoint, options) => {
  try {
    let response = await fetch(`${URL}/${endpoint}`, options);
    let data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default solicitud;
