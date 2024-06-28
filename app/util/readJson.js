const { processGetLinksArg, processGetLinksEng, processGetLinksCups } = require('./processRead/processReadLinks')
const { processGetStanding } = require('./processRead/processReadStandings')
const { processGetFixtures } = require('./processRead/processReadFixtures')
const pc = require('picocolors')

async function getDataLeague (req, res) {
  const { pathStanding, ...pathFixtures } = JSON.parse(req.cookies)

  console.log(`${pc.bgGreen('Procesando la respuesta')}`)
  const data = {}
  try {
    data.get = req.url
    data.timestamp = Date.now()
    const [{ standings }, { fixtures }] = await Promise.all([processGetStanding(pathStanding), processGetFixtures(pathFixtures)])
    data.response = [{ standings, fixtures }]
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.status(200).json(data)
  } catch (err) {
    console.log(`${pc.bgRed('Status:')} ${pc.red(500)}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.reference)}`)
    data.response = err
    res.status(500).json(data)
  }
}

async function getLinks (req, res) {
  const { pathArg, pathEng, pathNation, pathUEFA, pathCONMEBOL } = JSON.parse(req.cookies)
  const data = {}
  console.log(`${pc.bgGreen('Procesando la respuesta')}`)
  try {
    data.get = req.url
    data.timestamp = Date.now()
    const response = await Promise.all([
      processGetLinksArg(pathArg),
      processGetLinksEng(pathEng),
      processGetLinksCups('nations', pathNation),
      processGetLinksCups('conmebol', pathUEFA),
      processGetLinksCups('uefa', pathCONMEBOL)
    ])
    data.response = response
    console.log(`${pc.bgCyan('Status:')} ${pc.green(200)}`)
    console.log(`${pc.bgCyan('Message:')} ${pc.green('Respuesta formateada con exito.')}`)
    res.json(data)
  } catch (err) {
    console.log(`${pc.bgRed('Status:')} ${pc.red(500)}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.reference)}`)
    data.response = err
    res.status(500).json(data)
  }
  return data
}

module.exports = {
  getLinks,
  getDataLeague
}
