const solicitud = (url) => {
    return fetch(`http://localhost:3000/${url}`)
        .then(response => response.json())
        .then(json => json); // Devolver los datos JSON directamente
};

export default solicitud;
