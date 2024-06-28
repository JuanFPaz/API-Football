const { readFile } = require('node:fs/promises')
const rondasFilter = require('../../helpers/rondasFilter')

async function processGetFixtures (pathFixtures) {
  const { pathFixture, pathRounds } = pathFixtures
  let dataFixtures
  let dataRounds

  try {
    dataFixtures = await readFile(pathFixture, 'utf-8')
    dataRounds = await readFile(pathRounds, 'utf-8')
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error obteniendo los fixtures antes de enviar la respuesta.',
      process: 'proccessGetFixtures',
      message: err
    }
    throw customError
  }

  try {
    const { response: fixtures } = JSON.parse(dataFixtures)
    const { response: fases } = JSON.parse(dataRounds)
    const nameLeagueFilter = fixtures[0].league.name
    const fixturesFormateados = rondasFilter(nameLeagueFilter, fases, fixtures)

    if (fixturesFormateados.customError) {
      throw fixturesFormateados.customError
    }
    return { fixtures: fixturesFormateados }
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error formateando la respuesta final.',
      process: 'proccessGetFixtures',
      message: err
    }
    throw customError
  }
}

module.exports = {
  processGetFixtures
}
