const path = require("path");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "canciones.html"));
  })

  .post((req, res) => {
    res.send("Respuesta a POST");
  })

  .put((req, res) => {
    res.send("Respuesta a PUT");
  })

  .delete((req, res) => {
    res.send("Respuesta a DELETE");
  });

router.get("/descarga", (req, res) => {
  const archivo = req.query;
  console.log("req ", archivo.archivo);

  res.download(
    path.join(__dirname, "public", "images", `${archivo.archivo}`),
    archivo,
    (err) => {
      if (err) console.log("Occurrio un problema en la descarga, " + err);
      else console.log("Descarga exitosa!");
    }
  );
});

module.exports = router;
