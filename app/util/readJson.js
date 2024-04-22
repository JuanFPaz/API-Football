/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

async function processGetLinksArg () {
  let dataPath
  let dataFile
  try {
    dataPath = join(DATA_PATH, 'argentina', 'argentina.json')
  } catch (err) {
    const customError = {
      process: 'getLinksArg',
      message: 'Ocurrio un Error en process Get Links argentina, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
      reference: 'EL CHIQUI TAPIAAA'
    }
    console.error(err)
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      process: 'getLinksArg',
      message: 'Ocurrio un error leyendo el archivo.',
      reference: err
    }
    console.error(customError.message)
    throw customError
  }

  try {
    const { response } = JSON.parse(dataFile)
    const [,,,,, ligaProfesional, copaArgentina, trofeoCampeones,, superCopa,, copaDeLaLiga] = response
    const list = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
    const listFormateada = list.map(l => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map(s => {
        const { year, start, end, current } = s
        return { year, start, end, current }
      })
      return { league, seasons: seasonsFormateada }
    })
    const data = {
      country: {
        name: 'Argentina',
        code: 'AR',
        flag: 'https://media.api-sports.io/football/leagues/128.png'
      },
      list: listFormateada
    }
    return data
  } catch (err) {
    const customError = {
      process: 'getLinksCups',
      message: 'Ocurrio un error procesando la respuesta, antes de envirla D:',
      reference: err
    }
    console.error(customError.message)
    throw customError
  }
}

async function processGetLinksCups (confederacion) {
  let dataPath
  let dataFile

  try {
    dataPath = join(DATA_PATH, confederacion, `${confederacion}.json`)
  } catch (err) {
    const customError = {
      process: 'GetLinksCups',
      message: 'Ocurrio un Error en process Get Links de la ÜEFA o CORRUPTBOL, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
      reference: 'EL CHIQUI TAPIAAA aca tmb tiene la culpa'
    }
    console.error(err)
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      process: 'GetLinksCups',
      message: 'Ocurrio un error leyendo el archivo.',
      reference: err
    }
    console.error(customError.message)
    throw customError
  }

  try {
    const { response } = JSON.parse(dataFile)
    const list = response
    const listFormateada = list.map(l => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map(s => {
        const { year, start, end, current } = s
        return { year, start, end, current }
      })
      return { league, seasons: seasonsFormateada }
    })
    const data = {
      country: {
        name: confederacion.toUpperCase(),
        code: confederacion.toUpperCase(),
        flag: null
      },
      list: listFormateada
    }
    return data
  } catch (err) {
    const customError = {
      process: 'getLinksCups',
      message: 'Ocurrio un error procesando la respuesta, antes de envirla D:',
      reference: err
    }
    console.error(customError.message)
    throw customError
  }
}

async function processGetStanding (...params) {
  let dataPath
  let dataFile
  /* Crear la ruta de la solicitud: */
  try {
    if (params.length < 4) {
      const customError = {
        referenceCustomError: 'Se esperaban 4 argumentos, y solo pasamos ' + params.length
      }

      throw customError
    }
    if (params[3] !== 'standings') {
      /*
        No forzamos error, si no que devolvemos standings false para que en el front,
        podamos filtrar si el componente Copa tiene tablita de posiciones o no.
        Agarrado de los pelos? si. Funciona? nose ahora me fijo
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

  console.log('Leyendo el jodido archivo')

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

  console.log('Procesando la respuesta :D')

  try {
    const { response: [{ league: { standings } }] } = JSON.parse(dataFile)
    const standingsFormateadas = standings.map(standing => {
      // Parece redundante pero no lo es, cada liga tiene una tabla, por ejemplo la copa de la liga es un arreglo con 2 tablas
      // Seguramente la champions y la libertadores tengan 1 arreglo con 8 tablas
      // y la liga es arreglo con 1 tabla
      // Podria crear un standing.length === 1, evitar hacer el siguiente MAP, pero no veo porque no lo puede hacer
      const standingFormateada = standing.map(equipo => {
        const { team, points, goalsDiff, all, home, away } = equipo
        return {
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

    /* agrego nueva sentencia para reducir los standings en un solo arreglo, y hacer el every: */
    const equipos = standingsFormateadas.reduce((acc, curr) => acc.concat(curr), [])
    const partidosJugados = equipos.every(e => e.all.played === 0)
    // const tablaInicial = standingFormateada.every(e => e.all.played === 0)

    if (partidosJugados) {
      const standingsSorteadas = standingsFormateadas.map(standing => {
        return standing.sort((a, b) => (a.team.name > b.team.name) ? 1 : -1)
      })
      return { standings: standingsSorteadas }
    }

    // aca agregariamos el fixture, etx
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

/* EN LOS GET DATA TAMBIEN PUEDEN OCURRIR ERRORES, ASI QUE CUIDAO */
async function getDataLeague ({ country, season, nameLeague, nameData }) {
  /* TO DO: Capturar un error
   correctamente del promises all,
   porque si algo sale mal en algrun proceso,
   debemos capturarlo en el endpoint de la solicitud.
   Independientemente de que 3 de 4 procesos hayan salido bien
   no podemos devolver un procesos mal y 3 bien xd
  */
  let data
  try {
    data = await Promise.all([processGetStanding(country, season, nameLeague, nameData[0]), { fixture: ['holi'] }])
    console.log('Todos los datos fueron obtenidos con exito')
  } catch (err) {
    /* TODO, Verificar si es un error interno de processFunction u otro error. O manejar el error que venga del proccess de otra forma :/ */
    console.error(err.message)
    console.error('Retornamos un error intero :/')
    return { error: err }
  }

  return data
}

async function getDataCup ({ country, season, nameLeague, nameData }) {
  let data
  try {
    data = await Promise.all([processGetStanding(country, season, nameLeague, nameData[0]), { fixture: ['holi'] }])
    console.log('Todos los datos fueron obtenidos con exito')
  } catch (err) {
    console.error('Retornamos un error intero :/')
    return { error: err }
  }

  return data
}

async function getDataMatch () {
  // Solicitud para tener los datos de un partido en especifico solicitado por el usaurio
  // Ej: Boca vs RiBer
}

async function getLinksPrincipal () {
  let data
  try {
    data = await Promise.all([
      processGetLinksArg(), // a, en el catch de processGetLinks me estan lanzando un error, tengo que capturarlo y mandarlo a mi catch
      processGetLinksCups('conmebol'),
      processGetLinksCups('uefa')
    ])
  } catch (err) {
    console.error('Retornamos un error intero :/')
    return { error: err }
  }
  return data
}

module.exports = {
  getLinksPrincipal,
  getDataLeague,
  getDataCup
}
