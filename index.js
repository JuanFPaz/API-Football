const express = require('express')
const cors = require('cors')
const app = express()
const { getLinksPrincipal, getDataLeague } = require('./app/util/readJson')

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

app.get('/2024/liga-profesional-argentina', async (req, res) => {
  console.log('Hola')
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getDataLeague('argentina', '2024', 'liga-profesional-argentina', 'standings')
    res.json(data)
  } catch (error) {

  }
})

app.get('/2024/copa-de-la-liga-profesional', async (req, res) => {
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getDataLeague('argentina', '2024', 'copa-de-la-liga-profesional', 'standings')
    res.json(data)
  } catch (error) {

  }
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
