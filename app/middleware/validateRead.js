const validateURL = require('./proccesValidateRead/validateUrl')
const validateBodyCuky = require('./proccesValidateRead/validateBodyCuky')
const { validateLinksArg, validateLinksCups } = require('./proccesValidateRead/validateLinks')
const pc = require('picocolors')

async function validateReadLeague (req, res, next) {
  const { country, season, league } = req.params
  try {
    const bodyCuky = await validateURL({ country, league, season })
    const pathFiles = await validateBodyCuky({ ...bodyCuky })
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

async function validateReadLinks (req, res, next) {
  try {
    const pathArg = await validateLinksArg()
    // const pathEng = await validateLinksEng()
    const pathNation = await validateLinksCups('fifa')
    const pathUEFA = await validateLinksCups('uefa')
    const pathCONMEBOL = await validateLinksCups('conmebol')
    const pathFiles = {
      pathArg,
      pathNation,
      pathUEFA,
      pathCONMEBOL
    }
    req.cookies = JSON.stringify(pathFiles)
    console.log(`${pc.bgGreen('Request Valid')}`)
    next()
  } catch (err) {
    console.log(`${pc.bgRed('Request Invalid')}`)
    console.log(`${pc.bgRed('Message:')} ${pc.red(err.reference)}`)
    res.status(400).json(err)
  }
}

module.exports = {
  validateReadLeague,
  validateReadLinks
}
