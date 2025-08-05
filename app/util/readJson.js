const { processGetLinks } = require('./processRead/processReadLinks')
const { processGetStanding } = require('./processRead/processReadStandings')
const { processGetFixtures } = require('./processRead/processReadFixtures')
const pc = require('picocolors')

async function getDataLeague (req, res) {
  const pathsFormateadas = JSON.parse(req.cookies)
  // console.log(pathsFormateadas)

  console.log(`${pc.bgGreen('Procesando la respuesta')}`)
  const data = {}
  try {
    data.get = req.url
    data.timestamp = Date.now()
    const dataFixtures = await processGetFixtures(pathsFormateadas)
    const dataStandings = await processGetStanding(pathsFormateadas)
    data.response = [{ dataStandings, dataFixtures }]
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.status(200).json(data)
  } catch (err) {
    console.log(`${pc.bgRed('Status:')} ${pc.red(500)}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    console.log(err)
    data.response = err
    res.status(500).json(data)
  }
}
async function getLinks (req, res) {
  const data = {}
  try {
    data.get = req.url
    data.timestamp = Date.now()
    const response = await processGetLinks()
    data.response = response
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.json(data)
  } catch (err) {
    console.log(`${pc.bgRed('Status:')} ${pc.red(500)}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    data.response = err.message
    res.status(500).json(data)
  }
}

module.exports = {
  getLinks,
  getDataLeague
}
