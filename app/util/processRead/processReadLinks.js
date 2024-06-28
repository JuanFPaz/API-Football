/* eslint-disable no-unused-vars */
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetLinksArg (path) {
  let dataFile
  try {
    dataFile = await readFile(path, 'utf-8')
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
    const data = {
      country: {
        name: 'Argentina',
        code: 'ARG',
        flag: 'https://media.api-sports.io/flags/ar.svg'
      }
    }
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${data.country.code.toLowerCase()}/${year.toString()}/${league.name.toLowerCase().toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })

    data.country.leagues = listFormateada
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

async function processGetLinksEng (path) {
  let dataFile

  try {
    dataFile = await readFile(path, 'utf-8')
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
    const data = {
      country: {
        name: 'Pirata go Home',
        code: 'ENG',
        flag: 'https://media.api-sports.io/flags/gb.svg'
      }
    }
    const listFormateada = list.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${data.country.code.toLowerCase()}/${year.toString()}/${league.name.toLowerCase().toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })

    data.country.leagues = listFormateada
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

async function processGetLinksCups (nation, path) {
  let dataFile
  try {
    dataFile = await readFile(path, 'utf-8')
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
    /*
    TODO:
    ACA FORCE LA CREACION DEL DATA COUNTRY ANTES DE LISTFORMATEADA, PARA PODER OBTENER EL LEAGUE.CODE Y PONERLO EN LA URL DE LA LISTA FORMATEADA
    ASI QUE VAS A TENER QUE PENSAR EN OTRA ESTRATEGUIA Y ARREGLAR EL PROCESSREADLINKS -.-
    */
    // arreglar, usar objecto['conmebol'] en ves de esta sentencia condicional anidada.
    const FLAG = nation === 'conmebol' ? 'https://i.imgur.com/NCAlqtf.png' : nation === 'uefa' ? 'https://i.imgur.com/0ts3uoO.png' : ''
    const data = {
      country: {
        name: nation.toUpperCase(),
        code: nation.toUpperCase(),
        flag: FLAG
      }
    }
    const listFormateada = response.map((l) => {
      const { league, seasons } = l

      const seasonsFormateada = seasons.map((s) => {
        /* agregando links de los endpoints por season y compotencia */
        const { year, start, end, current } = s
        const link = `http://localhost:3000/${data.country.code.toLowerCase()}/${year.toString()}/${league.name.toLowerCase().replace(/\s/g, '-')}`
        return { year, start, end, current, link }
      })
      return { league, seasons: seasonsFormateada }
    })

    data.country.leagues = listFormateada
    return data
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'processGetLinksCups',
      reference: 'Ocurrio un Error proccesando la respuesta de processGetLinksCups de ' + nation + '.',
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
