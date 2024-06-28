/* eslint-disable promise/param-names */
const express = require('express')
const cors = require('cors')
const app = express()
const { createLinks, createFixtures, createStandings } = require('./app/util/createJson')
const { getLinks, getDataLeague, getDataCup } = require('./app/util/readJson')
const pc = require('picocolors')

const PORT = process.env.PORT ?? 3000

app.use(cors())

app.use('/:season/:league', (req, res, next) => {
  console.log(req.params)
  const data = {
    league: req.params.league,
    season: req.params.season
  }
  req.cookies = JSON.stringify(data)
  next()
})

app.post('/links', async (req, res) => {
  const { method, url } = req

  let body = ''
  req.on('data', (chunk) => {
    // Recibe un objeto asi:
    // const fakeBody = {
    //   id: [9,8,7,5,4]
    //   country: ['world, nations']
    // }
    // o asi
    // Recibe un objeto asi:
    // const fakeBody = {
    //   id: [9,8,7,5,4]
    //   country: ['argenita']
    // }
    body += chunk
  })
  req.on('end', async () => {
    const data = {}
    const bodyParse = JSON.parse(body)
    try {
      console.log(`${pc.bgMagenta(method + ':')} ${pc.green(url)}`)
      data.post = req.url
      data.timestamp = Date.now()
      data.response = await createLinks({ ...bodyParse })
      if (data.response.error) {
        throw data.response.error
      }
      console.log(`${pc.bgCyan('Status: ')} ${pc.green(202)}`)
      res.status(202).json(data)
    } catch (err) {
      data.error = err
      data.response = [{ message: data.error.message }]
      console.error(`${pc.bgRed('Status: ')} ${pc.red(409)}`)
      console.error(`${pc.bgRed('Reference: ')} ${pc.red(data.error.reference)}`)
      console.error(`${pc.bgRed('Message:')} ${pc.red(data.error.message)}`)
      res.status(409).json(data)
    }
  })
})

app.post('/fixtures', async (req, res) => {
  const { method, url } = req

  let body = ''
  req.on('data', (chunk) => {
    // Recibe un objeto asi:
    // const fakeBody = {
    //   league: 848,
    //   season: 2023,
    //   country: ['UEFA']
    // }
    body += chunk
  })
  req.on('end', async () => {
    const data = {}
    const bodyParse = JSON.parse(body)
    try {
      console.log(`${pc.bgMagenta(method + ':')} ${pc.green(url)}`)
      data.post = req.url
      data.timestamp = Date.now()
      data.response = await createFixtures({ ...bodyParse })
      if (data.response.error) {
        throw data.response.error
      }
      console.log(`${pc.bgCyan('Status: ')} ${pc.green(202)}`)
      res.status(202).json(data)
    } catch (err) {
      data.error = err
      data.response = [{ message: data.error.message }]
      console.error(`${pc.bgRed('Status: ')} ${pc.red(409)}`)
      console.error(`${pc.bgRed('Reference: ')} ${pc.red(data.error.reference)}`)
      console.error(`${pc.bgRed('Message:')} ${pc.red(data.error.message)}`)
      res.status(409).json(data)
    }
  })
})

app.post('/standings', async (req, res) => {
  const { method, url } = req

  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })
  req.on('end', async () => {
    const data = {}
    const bodyParse = JSON.parse(body)
    try {
      console.log(`${pc.bgMagenta(method + ':')} ${pc.green(url)}`)
      data.post = req.url
      data.timestamp = Date.now()
      data.response = await createStandings({ ...bodyParse })
      if (data.response.error) {
        throw data.response.error
      }
      console.log(`${pc.bgCyan('Status: ')} ${pc.green(202)}`)
      res.status(202).json(data)
    } catch (err) {
      data.error = err
      data.response = [{ message: data.error.message }]
      console.error(`${pc.bgRed('Status: ')} ${pc.red(409)}`)
      console.error(`${pc.bgRed('Reference: ')} ${pc.red(data.error.reference)}`)
      console.error(`${pc.bgRed('Message:')} ${pc.red(data.error.message)}`)
      res.status(409).json(data)
    }
  })
})

app.get('/', async (req, res) => {
  const { method, url } = req

  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = req.url
    data.timestamp = Date.now()
    data.response = await getLinks()
    if (data.response.error) {
      throw data.response.error
    }
    console.log(`${pc.bgCyan('Status: ')} ${pc.green(200)}`)
    res.json(data)
  } catch (err) {
    data.error = err
    data.response = [{ message: data.error.message }]
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(data.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(data.error.message)}`)
    res.status(500).json(data)
  }
})

app.get('/:season/liga-profesional-argentina', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'argentina',
    season,
    league: 'Liga Profesional Argentina',
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

app.get('/:season/premier-league', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'england',
    season,
    league: 'Premier League',
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
    console.error(`${pc.bgRed('Status: ')} ${pc.red(500)}`)
    console.error(`${pc.bgRed('Reference: ')} ${pc.red(response.error.reference)}`)
    console.error(`${pc.bgRed('Message:')} ${pc.red(response.error.message)}`)
    res.status(500).json(err)
  }
})

app.get('/:season/copa-de-la-liga-profesional', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'argentina',
    season,
    league: 'Copa de la liga Profesional',
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

app.get('/:season/copa-argentina', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'argentina',
    season,
    league: 'Copa Argentina',
    nameData: [false, 'fixtures']
  }
  const data = {}
  try {
    console.log(`${pc.bgCyan(method + ':')} ${pc.green(url)}`)
    data.get = req.url
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

app.get('/:season/fa-cup', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'england',
    season,
    league: 'FA Cup',
    nameData: [false, 'fixtures']
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

app.get('/:season/conmebol-libertadores', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'conmebol',
    season,
    league: 'CONMEBOL Libertadores',
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

app.get('/:season/euro-championship', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'nations',
    season,
    league: 'Euro Championship',
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

app.get('/:season/copa-america', async (req, res) => {
  const { method, url, cookies } = req
  const { season, league } = JSON.parse(cookies)
  const fakeBody = {
    country: 'nations',
    season,
    league,
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

app.get('/:season/conmebol-sudamericana', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'conmebol',
    season,
    league: 'CONMEBOL sudamericana',
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

app.get('/:season/conmebol-recopa', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'conmebol',
    season,
    league: 'CONMEBOL Recopa',
    nameData: [false, 'fixtures']
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

app.get('/:season/uefa-champions-league', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'uefa',
    season,
    league: 'UEFA Champions League',
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

app.get('/:season/uefa-europa-league', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'uefa',
    season,
    league: 'UEFA Europa League',
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

app.get('/:season/uefa-europa-conference-league', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'uefa',
    season,
    league: 'UEFA Europa Conference League',
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
app.get('/:season/uefa-super-cup', async (req, res) => {
  const { method, url, params } = req
  const { season } = params
  const fakeBody = {
    country: 'uefa',
    season,
    league: 'UEFA Super Cup',
    nameData: [false, 'fixtures']
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
