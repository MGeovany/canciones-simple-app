const path = require('path')

const express = require('express')
const router = express.Router()

router.get('/artista', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'artista.html'))
})

module.exports = router
