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
        const { fixture: { id, date, venue, status }, league: { round }, teams, goals, score } = fx
        return { round, id, date, venue, status, teams, goals, score }
      })

      return {
        jornada: f,
        partidosLength: fixtureFiltrado.length,
        // aca podria poner el status fixture global de los partidos
        // Si no estan definidos todas los partidos, ponemos la unica fecha por defecto,
        // De lo contrario, podemos filtrar los dias que se van a jugar, y devolverlo en u narreglo
        // Para que el front pueda separar los partidos por dia y simplmente se encargue de ordenarlos por horarios.
        partidos: fixtureFiltrado
      }
    })

    const fixturePorRondas = rondasCopaDeLaLiga([...fixturesFormateados])
    return { fixturesLength: fixturePorRondas.length, fixtures: fixturePorRondas }
  } catch (error) {}
}

module.exports = {
  processGetFixtures
}

function rondasCopaDeLaLiga (unFixture) {
  const regex = /^1st Phase - (?:[1-9]|1[0-4])$/

  const primeraFaseFormateada = unFixture.filter(f => regex.test(f.jornada))
  const segundaFaseFormateada = unFixture.filter(f => !regex.test(f.jornada))

  const primeraFase = [
    {
      roundName: 'Fase de grupos',
      roundLength: primeraFaseFormateada.length,
      rounds: primeraFaseFormateada
    }
  ]

  const segundaFase = [
    {
      roundName: 'Fase Final',
      roundLength: segundaFaseFormateada.length,
      rounds: segundaFaseFormateada
    }
  ]
  return [primeraFase, segundaFase]
}

// const asd = {
fixtures: [
  [
    {
      round: 'Fase de grupos',
      fixtureLength: 14,
      fixture: [
        {
          jornada: '1st Phase - 1',
          partidosLength: 14,
          partidos: [{ partido: 'Uno' }, { partido: 'dos' }/* etc */]
        },
        {
          jornada: '1st Phase - 2',
          partidosLength: 14,
          partidos: [{ partido: 'Uno' }, { partido: 'dos' }/* etc */]
        }
        /* Asi hasta obtener todos los de 1st Phase  entre el 1 y el 14 */
      ]
    }
  ],
  [
    {
      round: 'Fase Final',
      fixtureLength: 4,
      fixture: [
        {
          jornada: '1st Phase - Cuartos de final',
          partidosLength: 14,
          partidos: [{ partido: 'Uno' }, { partido: 'dos' }/* etc */]
        },
        {
          jornada: '1st Phase - Semifinal',
          partidosLength: 14,
          partidos: [{ partido: 'Uno' }, { partido: 'dos' }/* etc */]
        }
        /* Asi hasta obtener todos los que sean diferentes a 1st Phase  entre el 1 y el 14 */
      ]
    }
  ]
]
// }
