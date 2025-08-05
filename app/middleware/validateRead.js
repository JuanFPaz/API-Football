const validarReqParams = require('./proccesValidateRead/validateUrl')
const { generarRutasLigas } = require('../helpers/generarRutas')
const pc = require('picocolors')

async function validateReadLeague (req, res, next) {
  try {
    await validarReqParams(req.params)
    const pathFiles = await generarRutasLigas(req.params)
    req.cookies = JSON.stringify(pathFiles)
    console.log(`${pc.bgGreen('Request Valid')}`)
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.message)}`)
    const data = {}
    data.get = req.url
    data.timestamp = Date.now()
    data.response = err
    res.status(400).json(data)
  }
}

module.exports = {
  validateReadLeague
}
