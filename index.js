const express = require('express')
const cors = require('cors')
const app = express()
const { getLinksPrincipal } = require('./app/util/readJson')

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
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getLinksPrincipal()
    res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

app.get('/liga-profesional-argentina', async (req, res) => {

})

app.get('/copa-de-la-liga', async (req, res) => {

})

app.get('/copa-argentina', async (req, res) => {

})

app.get('/supercopa', async (req, res) => {

})

app.get('/trofeo-de-campeones', async (req, res) => {

})

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT)
})
