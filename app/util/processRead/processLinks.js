const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

console.log(DATA_PATH)

async function processGetLinksArg () {
  let dataPath
  let dataFile
  try {
    dataPath = join(DATA_PATH, 'argentina', 'argentina.json')
  } catch (err) {
    const customError = {
      process: 'getLinksArg',
      message:
          'Ocurrio un Error en process Get Links argentina, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
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
    const [, , , , , ligaProfesional, copaArgentina, trofeoCampeones, , superCopa, , copaDeLaLiga] = response
    const list = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
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
      message:
          'Ocurrio un Error en process Get Links de la ÜEFA o CORRUPTBOL, creando la ruta. - No creo que ocurra ningu nerror aca, por ahora.',
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
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
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

module.exports = {
  processGetLinksArg,
  processGetLinksCups
}
