const { readFile } = require('node:fs/promises')
const rondasFilter = require('../../helpers/rondasFilter')

async function processGetFixtures ({ fixture, rounds, standing }) {
  let dataFixtures
  let dataRounds

  try {
    dataFixtures = await readFile(fixture, 'utf-8')
    dataRounds = await readFile(rounds, 'utf-8')
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
    const id = fixtures[0].league.id
    const dataFormatear = { id, fases, fixtures }

    if (id === 13 || id === 11 || id === 1 || id === 15 || id === 9) {
      try {
        const data = await readFile(standing, 'utf-8')
        const __data = JSON.parse(data)
        const { response: [{ league: { standings } }] } = __data
        dataFormatear.standings = standings
      } catch (err) {
        const customError = {
          reference: 'Hubo un error leyendo la tabla de la copa libertadores',
          process: 'proccessGetFixtures',
          message: err
        }
        throw customError
      }
    }
    const fixturesFormateados = rondasFilter(dataFormatear)

    if (fixturesFormateados.customError) {
      throw fixturesFormateados.customError
    }

    return fixturesFormateados
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
