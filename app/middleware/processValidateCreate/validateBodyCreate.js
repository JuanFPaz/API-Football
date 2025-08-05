/* eslint-disable camelcase */
async function validateBodyCreatePais ({ id, country, code }) {
  try {
    if (!Array.isArray(id)) {
      throw Error('Esperabamos un arreglo, ID no es un arreglo')
    }
    if (!Array.isArray(country)) {
      throw Error('Esperabamos un arreglo, COUNTRY no es un arreglo, ctm')
    }
    if (!Array.isArray(code)) {
      throw Error('Esperabamos un arreglo, code no es un arreglo, ctm')
    }
  } catch (err) {
    const customError = {
      process: 'validateBodyCreatePais',
      message: err.message
    }
    throw customError
  }
}

async function validateBodyCreateFixture ({ id, season, code, leagueName, leagueCode }) {
  try {
    if (!Array.isArray(id)) {
      throw Error('Esperabamos un arreglo, ID no es un arreglo')
    }
    if (!Array.isArray(season)) {
      throw Error('Esperabamos un arreglo, SEASON no es un arreglo')
    }
    if (!Array.isArray(code)) {
      throw Error('Esperabamos un arreglo, CODE no es un arreglo')
    }
    if (!Array.isArray(leagueName)) {
      throw Error('Esperabamos un arreglo, leagueName no es un arreglo')
    }
    if (!Array.isArray(leagueCode)) {
      throw Error('Esperabamos un arreglo, leagueCode no es un arreglo')
    }
  } catch (err) {
    const customError = {
      process: 'validateBodyCreateFixture',
      message: err.message
    }
    throw customError
  }
}

async function validateBodyCreateStandings ({ id, season, code, leagueName, leagueCode }) {
  try {
    if (!Array.isArray(id)) {
      throw Error('Esperabamos un arreglo, ID no es un arreglo')
    }
    if (!Array.isArray(season)) {
      throw Error('Esperabamos un arreglo, SEASON no es un arreglo')
    }
    if (!Array.isArray(code)) {
      throw Error('Esperabamos un arreglo, CODE no es un arreglo')
    } if (!Array.isArray(leagueName)) {
      throw Error('Esperabamos un arreglo, leagueName no es un arreglo')
    }
    if (!Array.isArray(leagueCode)) {
      throw Error('Esperabamos un arreglo, leagueCode no es un arreglo')
    }
  } catch (err) {
    const customError = {
      process: 'validateBodyCreateStandings',
      message: err.message
    }
    throw customError
  }
}

module.exports = { validateBodyCreatePais, validateBodyCreateFixture, validateBodyCreateStandings }
