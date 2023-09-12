document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buscarButton").addEventListener("click", function () {

        const selectedTag = document.getElementById("tagSelector").value;

        const apiUrl = 'https://api.waifu.im/search';

        // Parametros permitidos por la API, acepta tags en la peticion
        const params = {
            included_tags: selectedTag,
            height: '>=2000'
        };

        // URLSearchParams es una parte de la API de URL de JavaScript
        // que se utiliza para trabajar con los parámetros de consulta de una URL.
        // resultado de params ?included_tags=maid&height=%3E=2000

        const queryParams = new URLSearchParams(params);
        
        const urlFinal = `${apiUrl}?${queryParams}`;

        fetch(urlFinal)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La solicitud falló con el código de estado: ' + response.status);
                }
            })
            .then(data => {
                console.log(data);

                const imageUrl = data.images[0].url;

                const contenedorImagenes = document.getElementById('contenedor-imagenes');

                const imagen = new Image();
                imagen.src = imageUrl;

                contenedorImagenes.innerHTML = ""
                contenedorImagenes.appendChild(imagen);
            })
            .catch(error => {
                console.error('Se produjo un error:', error.message);
            });

    });
});