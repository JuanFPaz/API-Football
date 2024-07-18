/* eslint-disable promise/param-names */
const express = require('express')
const cors = require('cors')
const app = express()
const { validateCreateLinks, validateCreateFxSt } = require('./app/middleware/validateCreate')
const { validateReadLeague, validateReadLinks } = require('./app/middleware/validateRead')
const { createLinks, createFixtures, createStandings } = require('./app/util/createJson')
const { getDataLeague, getLinks } = require('./app/util/readJson')
const bodyParse = require('./app/helpers/bodyParser')
const pc = require('picocolors')

const PORT = process.env.PORT ?? 3000

app.use(cors())

app.use((req, res, next) => {
  const { method, url } = req
  console.log(' ')
  console.log(`${pc.bgCyan('URL :')} ${pc.green(url)}`)
  console.log(`${pc.bgCyan('METHOD :')} ${pc.green(method)}`)
  console.log(`${pc.bgCyan('DATE:')} ${pc.green(new Date().toLocaleString())}`)
  next()
})

app.post('/:resource', bodyParse)

app.post('/links', validateCreateLinks)

app.post('/links', createLinks)

app.post('/fixtures', validateCreateFxSt)

app.post('/fixtures', createFixtures)

app.post('/standings', validateCreateFxSt)

app.post('/standings', createStandings)

app.get('/', validateReadLinks)

app.get('/', getLinks)

app.get('/:country/:season/:league', validateReadLeague)

app.get('/:country/:season/:league', getDataLeague)

app.use((req, res) => {
  const data = {}
  data.url = req.url
  data.timestamp = Date.now()
  data.error = { message: 'URL Inexistente' }
  console.log(`${pc.bgRed('Request Invalid')}`)
  console.log(`${pc.bgRed('Message:')} ${pc.red(data.error.message)}`)
  res.status(400).json(data)
})

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT)
})
