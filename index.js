const express = require('express')
const cors = require('cors')
const app = express()
const { getLinksPrincipal, getDataLeague, getDataCup } = require('./app/util/readJson')
const pc = require('picocolors')

const PORT = process.env.PORT ?? 3000

app.use(cors())

app.get('/', async (req, res) => {
  const { method, url } = req

  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = req.url
    data.timestamp = Date.now()
    data.response = await getLinksPrincipal()
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
    console.log(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2024/liga-profesional-argentina', async (req, res) => {
  const { method, url } = req
  const fakeBody = {
    country: 'argentina',
    season: '2024',
    nameLeague: 'Liga Profesional Argentina',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataLeague({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    const { response } = err
    console.log(response)
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2024/copa-de-la-liga-profesional', async (req, res) => {
  const { method, url } = req

  const fakeBody = {
    country: 'argentina',
    season: '2024',
    nameLeague: 'Copa de la liga Profesional',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = req.url
    data.timestamp = Date.now()
    data.response = await getDataLeague({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})
app.get('/2024/copa-argentina', async (req, res) => {
  const { method, url } = req

  const fakeBody = {
    country: 'argentina',
    season: '2024',
    nameLeague: 'Copa Argentina',
    nameData: [null, 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = req.url
    data.timestamp = Date.now()
    data.response = await getDataLeague({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})
app.get('/2024/conmebol-libertadores', async (req, res) => {
  const { method, url } = req
  const fakeBody = {
    country: 'conmebol',
    season: '2024',
    nameLeague: 'CONMEBOL Libertadores',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataCup({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2024/conmebol-sudamericana', async (req, res) => {
  const { method, url } = req
  const fakeBody = {
    country: 'conmebol',
    season: '2024',
    nameLeague: 'CONMEBOL sudamericana',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataCup({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2023/uefa-champions-league', async (req, res) => {
  const { method, url } = req

  const fakeBody = {
    country: 'uefa',
    season: '2023',
    nameLeague: 'UEFA Champions League',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataCup({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2023/uefa-europa-league', async (req, res) => {
  const { method, url } = req
  const fakeBody = {
    country: 'uefa',
    season: '2023',
    nameLeague: 'UEFA Europa League',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataCup({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/2023/uefa-europa-conference-league', async (req, res) => {
  const { method, url } = req
  const fakeBody = {
    country: 'uefa',
    season: '2023',
    nameLeague: 'UEFA Europa Conference League',
    nameData: ['standings', 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = url
    data.timestamp = Date.now()
    data.response = await getDataCup({ ...fakeBody })
    if (data.response.error) {
      throw data
    }
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(err.response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(err.response.error.message)}`)
    res.status(500).json(err)
  }
})

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT)
})
