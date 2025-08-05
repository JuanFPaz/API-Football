const { validateBodyCreatePais, validateBodyCreateFixture, validateBodyCreateStandings } = require('./processValidateCreate/validateBodyCreate')
const { validateIds } = require('./processValidateCreate/validateInt')
const { validateCountryCode, validateLeagueName, validateLeagueCode } = require('./processValidateCreate/validateNames')
const { generarRutaPais, generarRutaFixtures, generarRutaStandings, generarRutaDataLeague } = require('../helpers/generarRutas')
const pc = require('picocolors')

async function validateCreateDataLeague (req, res, next) {
  try {
    await validateBodyCreateFixture(req.body)
    await validateIds(req.body)
    await validateCountryCode(req.body)
    await validateLeagueName(req.body)
    await validateLeagueCode(req.body)
    const pathFiles = await generarRutaDataLeague(req.body)
    req.body.pathFiles = pathFiles
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    const data = {}
    data.post = req.url
    data.timestamp = Date.now()
    data.response = err
    res.status(400).json(data)
  }
}

async function validateCreatePais (req, res, next) {
  try {
    await validateBodyCreatePais(req.body)
    await validateIds(req.body)
    await validateCountryCode(req.body)
    const { pathLink } = await generarRutaPais(req.body)
    req.body.path = pathLink
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    const data = {}
    data.post = req.url
    data.timestamp = Date.now()
    data.response = err
    res.status(400).json(data)
  }
}

async function validateCreateFixture (req, res, next) {
  try {
    await validateBodyCreateFixture(req.body)
    await validateIds(req.body)
    await validateCountryCode(req.body)
    await validateLeagueName(req.body)
    await validateLeagueCode(req.body)
    const pathFiles = await generarRutaFixtures(req.body)
    req.body.pathFiles = pathFiles
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    const data = {}
    data.post = req.url
    data.timestamp = Date.now()
    data.response = err
    res.status(400).json(data)
  }
}

async function validateCreateStanding (req, res, next) {
  try {
    await validateBodyCreateStandings(req.body)
    await validateIds(req.body)
    await validateCountryCode(req.body)
    await validateLeagueName(req.body)
    await validateLeagueCode(req.body)
    const pathFiles = await generarRutaStandings(req.body)
    req.body.pathFiles = pathFiles
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    const data = {}
    data.post = req.url
    data.timestamp = Date.now()
    data.response = err
    res.status(400).json(data)
  }
}

module.exports = { validateCreatePais, validateCreateFixture, validateCreateDataLeague, validateCreateStanding }
