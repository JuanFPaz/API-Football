/* eslint-disable no-unused-vars */
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetLinksArg () {
  let dataPath
  let dataFile
  try {
    dataPath = join(DATA_PATH, 'argentina', 'argentina.json')
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'getLinksArg',
      reference: 'Ocurrio un Error en process Get Links argentina, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
      message: err.message
    }
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processGetLinksArg',
      reference: 'Ocurrio un error leyendo el archivo.',
      message: err.message
    }

    throw customError
  }

  try {
    const { response } = JSON.parse(dataFile)
    const [, , , , , ligaProfesional, copaArgentina, trofeoCampeones, , superCopa, , copaDeLaLiga] = response
    const list = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${year.toString()}/${league.name.toLowerCase().toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })
    const data = {
      country: {
        name: 'Argentina',
        code: 'AR',
        flag: 'https://media.api-sports.io/flags/ar.svg',
        leagues: listFormateada
      }
    }
    return data
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'getLinksCups',
      reference: 'Ocurrio un asdas',
      message: err.message
    }
    throw customError
  }
}

async function processGetLinksEng () {
  let dataPath
  let dataFile
  try {
    dataPath = join(DATA_PATH, 'england', 'england.json')
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processgetLinksEng',
      reference: 'Ocurrio un Error en process Get Links argentina, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
      message: err.message
    }
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processgetLinksEng',
      reference: 'Ocurrio un error leyendo el archivo.',
      message: err.message
    }

    throw customError
  }

  try {
    const { response } = JSON.parse(dataFile)
    const [premierLeague, , , faCup, , carabaoCup, , , , communityShield] = response
    const list = [premierLeague]
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${year.toString()}/${league.name.toLowerCase().toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })
    const data = {
      country: {
        name: 'Pirata go Home',
        code: 'ENG',
        flag: 'https://media.api-sports.io/flags/gb.svg',
        leagues: listFormateada
      }
    }
    return data
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'getLinksCups',
      reference: 'Ocurrio un ',
      message: err.message
    }
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
      isCustomError: true,
      process: 'processGetLinksCups',
      reference: 'Ocurrio un Error en processGetLinksCups de ' + confederacion + ', creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
      message: err.message
    }
    throw customError
  }

  try {
    dataFile = await readFile(dataPath, 'utf-8')
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processGetLinksCups',
      reference: 'Leyendo el archivo de processGetLinksCups',
      message: err.message
    }
    throw customError
  }

  try {
    const { response } = JSON.parse(dataFile)
    const listFormateada = response.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        /* agregando links de los endpoints por season y compotencia */
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${year.toString()}/${league.name.toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })

    // arreglar, usar objecto['conmebol'] en ves de esta sentencia condicional anidada.
    const FLAG = confederacion === 'conmebol' ? 'https://i.imgur.com/NCAlqtf.png' : confederacion === 'uefa' ? 'https://i.imgur.com/0ts3uoO.png' : ''
    const data = {
      country: {
        name: confederacion.toUpperCase(),
        code: confederacion.toUpperCase(),
        flag: FLAG,
        leagues: listFormateada
      }
    }
    return data
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processGetLinksCups',
      reference: 'Ocurrio un Error proccesando la respuesta de processGetLinksCups de ' + confederacion + '.',
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  processGetLinksArg,
  processGetLinksEng,
  processGetLinksCups
}
