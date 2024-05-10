const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetStanding (...params) {
  let dataPath
  let dataFile
  /* Crear la ruta de la solicitud: */
  try {
    if (params.length < 4) {
      const customError = {
        referenceCustomError:
              'Se esperaban 4 argumentos, y solo pasamos ' + params.length
      }

      throw customError
    }
    if (params[3] !== 'standings') {
      /*
            No forzamos error, si no que devolvemos standings false para que en el front,
            podamos filtrar si el componente Copa tiene tablita de posiciones o no.
            Agarrado de los pelos? si. Funciona? Si
          */
      return { standings: false }
    }
    const [country, season, nameLeague, nameData] = params
    const nameLeagueFormated = nameLeague.toLowerCase().replace(/\s/g, '-') // Sirve para el nombre del directorio que queremos ir y el nmombre del archivo
    const nameFile = `${nameData}-${nameLeagueFormated}-${season}.json`
    // Ejemplo data path: '/data/argentina/season/2024/liga-profesional-argentina/standings-liga-profesional-argentina-2024.json'
    dataPath = join(DATA_PATH, country, 'season', season, nameLeagueFormated, nameFile)
  } catch (err) {
    const customError = {
      process: 'getStanding',
      message: 'Ocurrio un Error en process standing, creando la ruta:',
      reference: err
    }
    console.log(customError.message)
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      process: 'getStanding',
      message: 'Ocurrio un error leyendo el archivo.',
      reference: err
    }
    console.error(err.message)
    console.error(customError.message)
    throw customError
  }

  try {
    const { response: [{ league: { standings, country, name } }] } = JSON.parse(dataFile)
    const standingsFormateadas = standings.map((standing) => {
      // Parece redundante pero no lo es, cada liga tiene una tabla, por ejemplo la copa de la liga es un arreglo con 2 tablas
      // Seguramente la champions y la libertadores tengan 1 arreglo con 8 tablas
      // y la liga es arreglo con 1 tabla
      // Podria crear un standing.length === 1, evitar hacer el siguiente MAP, pero no veo porque no lo puede hacer
      const standingFormateada = standing.map((equipo) => {
        const { group, team, points, goalsDiff, all, home, away } = equipo
        return {
          group,
          team,
          points,
          goalsDiff,
          all,
          home,
          away
        }
      })

      return standingFormateada
    })
    /* Agrege a centrarl corodoba EN LA TABLA DE LA LIGA PORQUE NO ESTAAAAAAAA */
    if (country === 'Argentina' && name === 'Liga Profesional Argentina') {
      const centralCordobaxD = {
        group: 'Liga Profesional Argentina',
        team: {
          id: 1065,
          name: 'Central Cordoba (SdE)',
          logo: 'https://media.api-sports.io/football/teams/1065.png'
        },
        points: 0,
        goalsDiff: 0,
        all: {
          played: 0,
          win: 0,
          draw: 0,
          lose: 0,
          goals: {
            for: 0,
            against: 0
          }
        },
        home: {
          played: 0,
          win: 0,
          draw: 0,
          lose: 0,
          goals: {
            for: 0,
            against: 0
          }
        },
        away: {
          played: 0,
          win: 0,
          draw: 0,
          lose: 0,
          goals: {
            for: 0,
            against: 0
          }
        }
      }
      standingsFormateadas[0].push(centralCordobaxD)
    }
    /* agrego nueva sentencia para reducir los standings en un solo arreglo, y hacer el every: */
    const equipos = standingsFormateadas.reduce((acc, curr) => acc.concat(curr), [])
    const partidosJugados = equipos.every((e) => e.all.played === 0)

    if (partidosJugados) {
      const standingsSorteadas = standingsFormateadas.map((standing) => {
        return standing.sort((a, b) => (a.team.name > b.team.name ? 1 : -1))
      })
      return { standings: standingsSorteadas }
    }

    return { standings: standingsFormateadas }
  } catch (err) {
    const customError = {
      process: 'getStanding',
      message: 'Ocurrio un error procesando la respuesta, antes de envirla D:',
      reference: err
    }
    console.error(customError.message)
    throw customError
  }
}

module.exports = {
  processGetStanding
}
