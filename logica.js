document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buscarButton").addEventListener("click", function () {

        /* What is Waifu.im?
        Waifu.im is an easy to use API that allows you to get waifu pictures 
        from an archive of over 4000 images and multiple tags!*/

        // Esta API no necesita autorizacion como tokens o apikey

        const apiUrl = 'https://api.waifu.im/search';
        // Parametros permitidos por la API, tag
        const params = {
            included_tags: 'waifu',
            height: '>=2000'
        };

        // URLSearchParams es una parte de la API de URL de JavaScript
        // que se utiliza para trabajar con los parámetros de consulta de una URL.
        // resultado de params ?included_tags=maid&height=%3E=2000
        const queryParams = new URLSearchParams(params);
        const requestUrl = `${apiUrl}?${queryParams}`;

        fetch(requestUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La solicitud falló con el código de estado: ' + response.status);
                }
            })
            .then(data => {

                console.log(data);

                const imageUrl = data.images[0].url; // cargamos la primera imagen

                const contenedorImagenes = document.getElementById('contenedor-imagenes');

                // Crear una nueva imagen
                const imagen = new Image();
                imagen.src = imageUrl;

                // Eliminamos la imagen anterior si la hubiera y mostramos la nueva
                contenedorImagenes.innerHTML = ""
                contenedorImagenes.appendChild(imagen);

            })
            .catch(error => {
                console.error('Se produjo un error:', error.message);
            });

    });
});