// npm install
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.listen(3000, () => console.log('App escuchando en el puerto 3000!'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose
  .connect(
    'mongodb+srv://allanvillatoro:Vanguardia2022@cluster0.z8xei.mongodb.net/PersonasDB?retryWrites=true&w=majority'
  )
  .catch((error) => handleError(error))

// Definiendo el esquema
const personaSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    // _id: Number,
    nombre: String,
    edad: Number,
    ciudad: String
  },
  {
    collection: 'Persona' // para forzar a enlazar con una colección
  }
)

// paseando el esquema al modelo
const Persona = mongoose.model('Persona', personaSchema)

app.get('/api/personas', (req, res) => {
  Persona.find((err, personas) => {
    if (err) res.status(500).send('Error en la base de datos')
    else res.status(200).json(personas)
  })
})

app.get('/api/personas/poredad', function (req, res) {
  // hace un query de los documentos
  Persona.find({ edad: { $gt: req.query.edad } }, function (err, personas) {
    if (err) {
      console.log(err)
      res.status(500).send('Error al leer de la base de datos')
    } else res.status(200).json(personas)
  })
})

app.get('/api/personas/:id', function (req, res) {
  // busca un registro por id
  Persona.findById(req.params.id, function (err, persona) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (persona != null) {
        res.status(200).json(persona)
      } else res.status(404).send('No se encontro esa persona')
    }
  })
})

app.post('/api/personas', function (req, res, next) {
  // crea un objeto pero del modelo Persona
  const persona1 = new Persona({
    // _id: req.body.id,
    // nombres: { nombre: req.body.nombre, apellido: req.body.apellido },
    nombre: req.body.nombre,
    edad: req.body.edad,
    ciudad: req.body.ciudad
    /*   fechan: new Date(1983, 05, 10),
    intereses: ["informatica", "fotografia", "Web development"],
    */
  })

  // guarda una persona en la base de datos
  persona1.save(function (error, persona1) {
    if (error) {
      res.status(500).send('No se ha podido agregar.')
      return next(err)
    }
    res.status(200).send(persona1) // envía al cliente el id generado
  })
})

app.put('/api/personas/:id', function (req, res) {
  // Modificar con Find ID
  Persona.findById(req.params.id, function (err, persona) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (persona != null) {
        persona.nombres.nombre = req.body.nombre
        persona.nombres.apellido = req.body.apellido
        persona.edad = req.body.edad
        persona.ciudad = req.body.ciudad

        persona.save(function (error, persona1) {
          if (error) res.status(500).send('Error en la base de datos')
          else {
            res.status(200).send('Modificado exitosamente')
          }
        })
      } else res.status(404).send('No se encontro esa persona')
    }
  })

  // modifica un documento
  /* Persona.updateMany({edad: {$gt: req.query.edad}, ciudad : req.query.ciudad}, {edad:60}, function(error,result) {
        if (error)
            res.status(500).send('Error en la base de datos');
        else if (result.nModified > 0)
            res.status(200).send('Modificados');
        else
            res.status(500).send('No se pudo modificar');
    }); */
})

app.delete('/api/personas/:id', function (req, res) {
  // Eliminar con Find ID
  Persona.findById(req.params.id, function (err, persona) {
    if (err) res.status(500).send('Error en la base de datos')
    else {
      if (persona != null) {
        persona.remove(function (error, result) {
          if (error) res.status(500).send('Error en la base de datos')
          else {
            res.status(200).send('Eliminado exitosamente')
          }
        })
      } else res.status(404).send('No se encontro esa persona')
    }
  })

  // elimina un documento
  /* Persona.deleteMany({_id:10}, function(error,result){
        if (error)
            res.status(500).send('Error en la base de datos');
        else if (result.result.n > 0)
            res.status(200).send('Eliminados');
        else
            res.status(500).send('No se pudo eliminar');
    }); */
})
