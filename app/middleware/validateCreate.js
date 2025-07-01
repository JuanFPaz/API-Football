const { validateBodyLinks, validateBodyFxSt } = require('./processValidateCreate/validateBodyCreate')
const { validateIdLinks, validateLeagueFxSt, validateSeasonFxSt } = require('./processValidateCreate/validateInt')
const validateLeague = require('./processValidateCreate/validateLeague')
const validateCountryLinks = require('./processValidateCreate/validateCountryLinks')
const pc = require('picocolors')

async function validateCreateLinks (req, res, next) {
  /**
   * Valida el cuerpo de la solicitud antes de la creacion del nuevo recurso.
   * Retorna el cuerpo de la solicitud con la ruta del archivo para el nuevo recurso:
   * {
   *  id:[1,2,3,4],
   *  country:["fifa"],
   *  path:[RUTA_DEL_ARCHIVO]
   * }
   */
  try {
    validateBodyLinks({ ...req.body })
    const idValidados = await validateIdLinks({ ...req.body })
    const { pathLink } = await validateCountryLinks({ ...req.body })
    req.body.id = idValidados
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

async function validateCreateFxSt (req, res, next) {
  try {
    validateBodyFxSt({ ...req.body })
    const leagueValidado = await validateLeagueFxSt({ ...req.body })
    const seasonValidado = await validateSeasonFxSt({ ...req.body })
    req.body.league = leagueValidado
    req.body.season = seasonValidado
    const pathFiles = await validateLeague({ ...req.body })
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

module.exports = { validateCreateLinks, validateCreateFxSt }
