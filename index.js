/*
Indicaciones:

Para realizar esta tarea, es necesario revisar los recursos de semana 2, especialmente los 6 ejemplos de Express. Además, acceder a la documentación de Express.

/1. Crear una aplicación usando Node, Express y Bootstrap que contenga las siguientes rutas:

/2. Ruta / la cual enviará al cliente una página HTML de bienvenida con el título "Mis canciones" y una foto de un artista.

/3. Ruta /canciones que tendrá lo siguiente métodos:

-/ GET: al recibir una solicitud de este tipo, enviará una página html con una lista de 5 canciones en forma de tabla. Cada canción tendrá un hipervínculo al que al darle clic deberá permitir al usuario descargar la canción (puede utilizar cualquier archivo simbólicamente)

-/ POST: al recicibir una solicitud de este tipo, debe regresar el mensaje "Respuesta a POST".

-/ PUT: al recicibir una solicitud de este tipo, debe regresar el mensaje "Respuesta a PUT".

-/ DELETE: al recicibir una solicitud de este tipo, debe regresar el mensaje "Respuesta a DELETE".

Todas estos métodos de ruta de /canciones deben estar en un solo archivo llamado canciones.js. Para ello debe utilizar express.Router(). El resto de rutas deben quedar en server.js.

Además, será necesario tener otro método de ruta /canciones/descarga para la descarga de los archivos. Utilice req.query (querystring) para que sea un solo método y funcione para descargar cualquier canción.

4. Ruta /acerca que mostrará otra página html con información de autor (nombre, carrera, número de cuenta y una descripción de la página).

5. En caso de que el cliente solicite otra ruta, deberá devolver una respuesta 404 de que la página solicitada no existe.

6. Subir el proyecto sin la carpeta node_modules en github.com y compartir el enlace solo a su profesor.

7. Enviar la URL de su repositorio en Blackboard.

Ponderación:

Estructura de Rutas 30%
Descarga de archivos 30%
Páginas HTML 30%
Enlace en GitHub 10%
*/

const express = require("express");
const path = require("path");
const canciones = require("./canciones");

app = express();

PORT = 3000;

app.listen(PORT, () => {
  console.log(`escuchando en: ${PORT}`);
});

/* 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

app.use(express.static(path.join(__dirname, "public")));

app.use("/canciones", canciones);

app.get("*", (req, res) => {
  res.status(404).send(`<h1> Whoops! Page not found</h1>`);
});
