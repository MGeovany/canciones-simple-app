/*

 -> Objetivo: Crear una API REST usando Node, Express y Mongo.
 -> Instrucciones: Crear una API REST para una tienda de música en línea que tenga los siguientes elementos:
 -> Un modelo para una base de datos de Música con los siguientes campos:

    => Canción
    => Artista
    => Álbum
    => Año
    => País

  Consultar todas las canciones
  Consultar una canción por ID
  Consulta de canciones por nombre de artista
  Consulta de canciones que sean del año X o más reciente
  Consulta de canciones que estén entre dos años (desde – hasta)
  Crear una nueva canción en la base de datos
  Modificar la información de una canción por su ID
  Eliminar una canción por su ID (o deshabilitarla para que ya no aparezca en los resultados)
  Todos los nuevos registros de la base de datos deben tener un ID autogenerado.
  Todas esas rutas deberán ir en /api/canciones. Aplicar conceptos de rutas en REST.

  -> Además, utilizará un Router y separará en dos archivos las siguientes rutas:
     - Inicio (index)
     - Canciones

  -> La ruta de Inicio mostrará un mensaje de bienvenida.
  -> La ruta de Canciones debe enviar un HTML (página) con una lista de 5 artistas con enlaces, y al darles clic, hará una solicitud GET al API y mostrará las canciones de ese artista específico en formato JSON.
  -> Si el usuario ingresa una ruta que no existe, debe aparecer un mensaje “Esta página no existe”.
  -> La base de datos se manejará de manera remota y deberá crearla en MongoAtlas.
  -> El proyecto debe crearse con Node.js, Express y Mongo.
  -> El proyecto puede ser subido a un repositorio de Github y subir aquí el enlace. En ningun caso deberá adjuntar la carpeta node_modules.

*/

const express = require('express')
const path = require('path')
const canciones = require('./canciones')
const acerca = require('./acerca')
const artista = require('./artista')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = 3000

app.listen(PORT, () => {
  console.log(`escuchando en: ${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', canciones)
app.use('/api', acerca)
app.use('/api', artista)

app.get('*', (req, res) => {
  res.status(404).send('<h1> Whoops! Page not found</h1>')
})
