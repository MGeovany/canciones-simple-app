// npm install
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose
  .connect(
    'mongodb+srv://JGalindo:Galindo02@cluster0.3ylgj.mongodb.net/TiendaDB?retryWrites=true&w=majority'
  )
  .catch((error) => handleError(error))

// Definiendo el esquema
const musicaSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    // _id: Number,
    cancion: String,
    artista: String,
    album: String,
    anio: Number,
    pais: String
  },
  {
    collection: 'Musica' // para forzar a enlazar con una colección
  }
)

// paseando el esquema al modelo
const Musica = mongoose.model('Musica', musicaSchema)

router.get('/canciones', (req, res) => {
  Musica.find((err, canciones) => {
    if (err) res.status(500).send('Error en la base de datos1')
    else res.status(200).json(canciones)
  })
})

router.get('/canciones/poranio', function (req, res) {
  // hace un query de los documentos
  Musica.find({ anio: { $gt: req.query.anio } }, function (err, canciones) {
    if (err) {
      console.log(err)
      res.status(500).send('Error al leer de la base de datos2')
    } else res.status(200).json(canciones)
  })
})

router.get('/canciones/entredosanios', function (req, res) {
  // hace un query de los documentos
  Musica.find({ anio: { $gt: req.query.anio, $lte: req.query.anio1 } }, function (err, canciones) {
    if (err) {
      console.log(err)
      res.status(500).send('Error al leer de la base de datos3')
    } else res.status(200).json(canciones)
  })
})

router.get('/canciones/artista', function (req, res) {
  // busca caciones por nombre de artista
  const nombre = {}
  Musica.find({ artista: req.query.artista }, function (err, canciones) {
    if (err) res.status(500).send('Error en la base de datos6 ')
    else {
      if (canciones != null) {
        res.status(200).json(canciones)
      } else res.status(404).send('No se encontro esa cancion')
    }
  })
})

router.get('/canciones/:id', function (req, res) {
  // busca un registro por id
  Musica.findById(req.params.id, function (err, cancion) {
    if (err) res.status(500).send('Error en la base de datos4 ')
    else {
      if (cancion != null) {
        res.status(200).json(cancion)
      } else res.status(404).send('No se encontro esa cancion')
    }
  })
})

// crear un nuevo registro de canciones
router.post('/canciones', function (req, res) {
  // crea un objeto pero del modelo musica
  const cancion1 = new Musica({
    cancion: req.body.cancion,
    artista: req.body.artista,
    album: req.body.album,
    anio: req.body.anio,
    pais: req.body.pais
  })
  // guarda una musica en la base de datos
  cancion1.save(function (error, cancion1) {
    if (error) {
      res.status(500).send('No se ha podido agregar.')
    } else {
      res.status(200).json(cancion1) // envía al cliente el id generado
    }
  })
})

// modificar un registro
router.put('/canciones/:id', function (req, res) {
  // Modificar con Find ID
  Musica.findById(req.params.id, function (err, cancion) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (cancion != null) {
        cancion.cancion = req.body.cancion
        cancion.artista = req.body.artista
        cancion.album = req.body.album
        cancion.anio = req.body.anio
        cancion.pais = req.body.pais

        cancion.save(function (error, cancion1) {
          if (error) res.status(500).send('Error en la base de datos')
          else {
            res.status(200).send('Modificado exitosamente')
          }
        })
      } else res.status(404).send('No se encontro esa persona')
    }
  })
})

// eliminar un registro
router.delete('/canciones/:id', function (req, res) {
  // Eliminar con Find ID
  Musica.findById(req.params.id, function (err, cancion) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (cancion != null) {
        cancion.remove(function (error, result) {
          if (error) res.status(500).send('Error en la base de datos')
          else {
            res.status(200).send('Eliminado exitosamente')
          }
        })
      } else res.status(404).send('No se encontro esa persona')
    }
  })
})

module.exports = router
