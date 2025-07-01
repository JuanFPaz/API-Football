const liga = require('../../helpers/validateReq')

async function validateURL ({ country, league, season }) {
  let getCountry
  let getLeague
  const _league = league.toLowerCase().replace(/-/g, '_')

  try {
    getCountry = liga[country]
    if (!getCountry) {
      throw Error(`Ocurrio un error leyendo los params: El valor /${country} no es un segmento valido.`)
    }
  } catch (err) {
    const customError = {
      middReference: 'validateURL',
      process: 'validateRead',
      message: err.message
    }
    throw customError
  }
  try {
    getLeague = getCountry[_league]
    if (!getLeague) {
      throw Error(`Ocurrio un error leyendo los params: El valor /${league} no es un segmento valido.`)
    }
  } catch (err) {
    const customError = {
      middReference: 'validateURL',
      process: 'validateRead',
      message: err.message
    }
    throw customError
  }

  return { country: getCountry.country, season, league, standing: getLeague.standing, fixture: getLeague.fixture }
}

module.exports = validateURL
