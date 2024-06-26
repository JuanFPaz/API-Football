const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const rondasFilter = require('../../helpers/rondasFilter')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetFixtures (...params) {
  let dataPathFixtures
  let dataPathRoundsFixtures
  let dataFileFixtures
  let dataFileRoundsFixtures
  /** Este se lo enviamos a roundFilter */
  let nameLeagueFilter
  /* Crear la ruta de la solicitud: */
  try {
    if (params.length < 4) {
      const customError = {
        referenceCustomError:
            'Se esperaban 4 argumentos, y solo pasamos ' + params.length
      }

      throw customError
    }
    const [country, season, nameLeague, nameData] = params
    nameLeagueFilter = nameLeague /** Lo hago aca pornque nose si el toLowerCase y el replace mutan el nameLague, despues lo pruebo. */
    const nameLeagueFormated = nameLeague.toLowerCase().replace(/\s/g, '-') // Sirve para el nombre del directorio que queremos ir y el nmombre del archivo
    const nameFileFixtures = `${nameData}-${nameLeagueFormated}-${season}.json`
    const nameFileRoundsFixtures = `rounds-${nameFileFixtures}`
    // Ejemplo data path: '/data/argentina/season/2024/liga-profesional-argentina/standings-liga-profesional-argentina-2024.json'
    dataPathFixtures = join(DATA_PATH, country, season, nameLeagueFormated, nameFileFixtures)
    dataPathRoundsFixtures = join(DATA_PATH, country, season, nameLeagueFormated, nameFileRoundsFixtures)
  } catch (err) {
    const customError = {
      process: 'getFixtures',
      message: 'Ocurrio un Error en process getFixtures, creando la ruta:',
      reference: err
    }
    console.log(customError.message)
    throw customError
  }

  try {
    dataFileFixtures = await readFile(dataPathFixtures, 'utf-8')
    dataFileRoundsFixtures = await readFile(dataPathRoundsFixtures, 'utf-8')
  } catch (err) {
    const customError = {
      process: 'getFixtures',
      message: 'Ocurrio un Error leyendo los archivos de los fixtures.',
      reference: err
    }
    throw customError
  }

  try {
    const { response: fases } = JSON.parse(dataFileRoundsFixtures)
    const { response: fixtures } = JSON.parse(dataFileFixtures)

    const fixturesFormateados = rondasFilter(nameLeagueFilter, fases, fixtures)

    if (fixturesFormateados.customError) {
      throw fixturesFormateados.customError
    }
    return { fixtures: fixturesFormateados }
  } catch (err) {
    const customError = {
      process: 'getFixtures',
      message: 'Ocurrio un Error formateando la respuesta de los fixtures.',
      reference: err
    }
    console.error(err)
    console.error(customError.message)
    throw customError
  }
}

module.exports = {
  processGetFixtures
}
