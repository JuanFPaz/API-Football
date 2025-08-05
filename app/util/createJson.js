const { processCreateLinks } = require('./processCreate/processCreateLinks')
const { processCreateFixtures } = require('./processCreate/processCreateFixtures')
const { processCreateStandings } = require('./processCreate/processCreateStandings')
const { proccesCreateDataLeague } = require('./processCreate/processCreateDataLeague')
const pc = require('picocolors')

async function createPais (req, res) {
  const data = {}
  try {
    data.post = req.url
    data.timestamp = Date.now()
    const createFile = await processCreateLinks({ ...req.body })
    data.response = createFile.message
    console.log(`${pc.bgCyan('Status:')} ${pc.green(201)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green(createFile.message)}`)
    res.status(201).json(data)
  } catch (err) {
    return { error: err }
  }
}

async function createFixtures (req, res) {
  const data = {}
  try {
    data.post = req.url
    data.timestamp = Date.now()
    const createFile = await processCreateFixtures({ ...req.body })
    data.response = createFile.message
    console.log(`${pc.bgCyan('Status:')} ${pc.green(201)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.status(201).json(data)
  } catch (err) {
    console.log(`${pc.bgRed('Status:')} ${pc.red(500)}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    console.log(err)
    data.response = err
    res.status(500).json(data)
  }
}

async function createStandings (req, res) {
  const data = {}
  try {
    data.post = req.url
    data.timestamp = Date.now()
    const createFile = await processCreateStandings({ ...req.body })
    data.response = createFile.message
    console.log(`${pc.bgCyan('Status:')} ${pc.green(201)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.status(201).json(data)
  } catch (err) {
    return { error: err }
  }
}

async function createDataLeague (req, res) {
  const data = {}
  try {
    data.post = req.url
    data.timestamp = Date.now()
    const createFile = await proccesCreateDataLeague({ ...req.body })
    data.response = createFile.message
    console.log(`${pc.bgCyan('Status:')} ${pc.green(201)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.status(201).json(data)
  } catch (err) {
    return { error: err }
  }
}
module.exports = {
  createPais,
  createDataLeague,
  createFixtures,
  createStandings
}
