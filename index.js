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
  /*
    Aca podria crear un fakeBody para que cuando solicitemos la listas de Links,
     nos devuelva siempre por defecto, las compoetencias actuales.
  */
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getLinksPrincipal()
    res.json(data)
    if (data.response.error) {
      throw data
    }
  } catch (err) {
    /* TODO: manejar errores de solicitud :D */
    res.status(500).json(err)
  }
})

app.get('/2024/liga-profesional-argentina', async (req, res) => {
  /*
    Simulamos un req.body, para más adelante reciclar una funcion de proceso de request
    y verificar que los datos recibidos son correctos,
    y enviarlos a getDataLeague.
  */
  const fakeBody = {
    country: 'argentina',
    season: '2024',
    nameLeague: 'Liga Profesional Argentina',
    nameData: 'standings'
  }
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getDataLeague({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/2024/copa-de-la-liga-profesional', async (req, res) => {
  const fakeBody = {
    country: 'argentina',
    season: '2024',
    nameLeague: 'Liga Profesional Argentina',
    nameData: 'standings'
  }
  const data = {}
  try {
    data.timestamp = Date.now()
    data.response = await getDataLeague({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    res.json(data)
  } catch (error) {
    res.status(500).json(error)
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
