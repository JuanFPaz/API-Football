const express = require('express')
const cors = require('cors')
const app = express()
const { ligaArgentina } = require('./app/util/readJson')

const PORT = process.env.PORT ?? 3000

app.use(cors())

/*
  Queremos devolver:
    Las competencias de la season actual
    Debemos recorrer el directorio season actual y ver que contiene (fs)
    Por ejemplo ARGENTINA:
    Copa de liga
    Copa Nac
    Ligas

*/
app.get('/', async (req, res) => {
  let data
  try {
    data = await ligaArgentina()
    res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT)
})
