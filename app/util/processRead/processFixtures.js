const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetFixtures (...params) {
  let dataPathFixtures
  let dataPathRoundsFixtures
  let dataFileFixtures
  let dataFileRoundsFixtures
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
    const nameLeagueFormated = nameLeague.toLowerCase().replace(/\s/g, '-') // Sirve para el nombre del directorio que queremos ir y el nmombre del archivo
    const nameFileFixtures = `${nameData}-${nameLeagueFormated}-${season}.json`
    const nameFileRoundsFixtures = `rounds-${nameFileFixtures}`
    // Ejemplo data path: '/data/argentina/season/2024/liga-profesional-argentina/standings-liga-profesional-argentina-2024.json'
    dataPathFixtures = join(DATA_PATH, country, 'season', season, nameLeagueFormated, nameFileFixtures)
    dataPathRoundsFixtures = join(DATA_PATH, country, 'season', season, nameLeagueFormated, nameFileRoundsFixtures)
  } catch (err) {
    const customError = {
      process: 'getFixtures',
      message: 'Ocurrio un Error en process getFixtures, creando la ruta:',
      reference: err
    }
    console.log(customError.message)
    throw customError
  }

  console.log('Leyendo el jodido archivo')

  try {
    dataFileFixtures = await readFile(dataPathFixtures, 'utf-8')
    dataFileRoundsFixtures = await readFile(dataPathRoundsFixtures)
  } catch (err) {
    const customError = {
      process: 'getFixtures',
      message: 'Ocurrio un Error leyendo los archivos de los fixtures.',
      reference: err
    }
    console.error(err.message)
    console.error(customError.message)
    throw customError
  }

  try {
    const { response: fases } = JSON.parse(dataFileRoundsFixtures)
    const { response: fixtures } = JSON.parse(dataFileFixtures)

    const fixturesFormateados = fases.map((f, idx) => {
      const fixtureFiltrado = fixtures.filter((fx) => fx.league.round === f).map((fx) => {
        const { fixture: { id, date, venue, status }, teams, goals, score } = fx
        return { id, date, venue, status, teams, goals, score }
      })

      return {
        jornada: `Fecha ${idx + 1}`,
        partidos: fixtureFiltrado
      }
    })

    return { fixtures: fixturesFormateados }
  } catch (error) {}
}

module.exports = {
  processGetFixtures
}
