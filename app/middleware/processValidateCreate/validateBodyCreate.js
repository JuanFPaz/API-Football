function validateBodyLinks ({ id, country }) {
  try {
    if (!Array.isArray(id)) {
      throw Error('Esperabamos un arreglo, ID no es un arreglo')
    }
    if (!Array.isArray(country)) {
      throw Error('Esperabamos un arreglo, COUNTRY no es un arreglo')
    }
  } catch (err) {
    const customError = {
      process: 'validateBodyLinks',
      message: err.message
    }
    throw customError
  }
}

function validateBodyFxSt ({ league, season, country }) {
  try {
    if (!Array.isArray(league)) {
      throw Error('Esperabamos un arreglo, LEAGUE no es un arreglo')
    }
    if (!Array.isArray(season)) {
      throw Error('Esperabamos un arreglo, SEASON no es un arreglo')
    }
    if (!Array.isArray(country)) {
      throw Error('Esperabamos un arreglo, COUNTRY no es un arreglo')
    }
  } catch (err) {
    const customError = {
      process: 'validateBodyFxSt',
      message: err.message
    }
    throw customError
  }
}

module.exports = { validateBodyLinks, validateBodyFxSt }
