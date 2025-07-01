async function validateIdLinks ({ id }) {
  /**
   * Valida que la proopiedad ID del cuerpo de la solicitud,
   * cada uno de los elementos sean Numeros,
   * devuelve el arreglo de ID validados.
   */
  let idValidados
  try {
    if (id.length === 0) {
      throw Error('Se esperaba un arreglo de numeros, y recibimos un arreglo vacio -.-')
    }

    idValidados = [...id].map(id => {
      const idParse = parseInt(id)
      if (!idParse) {
        throw Error('Se esperaba un arreglo de numeros, y recibimos otra cosa.')
      }
      return idParse
    })
  } catch (err) {
    const customError = {
      process: 'validateIdLinks',
      message: err.message
    }
    throw customError
  }

  return idValidados
}

async function validateLeagueFxSt ({ league }) {
  let leagueValidada
  try {
    if (league.length === 0) {
      throw Error('Se esperaba un arreglo de numeros, y recibimos un arreglo vacio -.-')
    }

    leagueValidada = [...league].map(id => {
      const idParse = parseInt(id)
      if (!idParse) {
        throw Error('Se esperaba un arreglo de numeros, y recibimos otra cosa.')
      }
      return idParse
    })
  } catch (err) {
    const customError = {
      process: 'validateIdLinks',
      message: err.message
    }
    throw customError
  }

  return leagueValidada
}

async function validateSeasonFxSt ({ season }) {
  let seasonValidada
  try {
    if (season.length === 0) {
      throw Error('Se esperaba un arreglo de numeros, y recibimos un arreglo vacio -.-')
    }

    seasonValidada = [...season].map(id => {
      const idParse = parseInt(id)
      if (!idParse) {
        throw Error('Se esperaba un arreglo de numeros, y recibimos otra cosa.')
      }
      return idParse
    })
  } catch (err) {
    const customError = {
      process: 'validateIdLinks',
      message: err.message
    }
    throw customError
  }

  return seasonValidada
}

module.exports = { validateIdLinks, validateLeagueFxSt, validateSeasonFxSt }
