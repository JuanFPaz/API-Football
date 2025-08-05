async function validateCountryCode ({ code }) {
  try {
    if (code.length === 0) {
      throw Error('Se esperaba un arreglo y recibimos un arreglo vacio')
    }
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error manipulando los datos del Country',
      process: 'validateCountryCode',
      message: err.message
    }
    throw customError
  }
}

async function validateLeagueName ({ leagueName }) {
  try {
    if (leagueName.length === 0) {
      throw Error('Se esperaba un arreglo y recibimos un arreglo vacio')
    }
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error manipulando los datos del Country',
      process: 'validateLeagueName',
      message: err.message
    }
    throw customError
  }
}

async function validateLeagueCode ({ leagueCode }) {
  try {
    if (leagueCode.length === 0) {
      throw Error('Se esperaba un arreglo y recibimos un arreglo vacio')
    }
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error manipulando los datos del Country',
      process: 'validateLeagueCode',
      message: err.message
    }
    throw customError
  }
}

module.exports = { validateCountryCode, validateLeagueName, validateLeagueCode }
