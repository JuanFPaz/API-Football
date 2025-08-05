const { access, readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const createDir = require('./createDir')

const DATA_PATH = resolve(__dirname, '../data/')

/** Metodos POST */
async function generarRutaPais ({ code }) {
  const nameDir = code[0].toLowerCase()

  const FILE_NAME = `${nameDir}.json`
  const PATH_DIR = join(DATA_PATH, nameDir) // app/data/{code}
  const PATH_FILE = join(PATH_DIR, FILE_NAME) // app/data/{code}/{code}.json

  try {
    await access(PATH_DIR)
  } catch (error) {
    const checkMk = await createDir(PATH_DIR)
    if (!checkMk.status) {
      throw checkMk
    }
  }
  const pathFormateada = {}
  try {
    await access(PATH_FILE)
    pathFormateada.pathLink = PATH_FILE
    return pathFormateada
  } catch (error) {
    // if (error.fileExist) {
    //   pathFormateada.pathLink = PATH_FILE
    //   return pathFormateada
    // } else if (error.code === 'ENOENT') {
    //   /* Retornamos la ruta de app/data/brazil + el nobmre del archivo,
    //   para que en el processCreateLinks,
    //   cree el archivo en la ruta especificada con el nombre especifico del archivo. */
    //   pathFormateada.pathLink = PATH_FILE
    //   return pathFormateada
    // }
    pathFormateada.pathLink = PATH_FILE
    return pathFormateada
  }
}

async function generarRutaDataLeague ({ id, season, code, leagueCode }) {
  const PATH_DIR = join(DATA_PATH, code[0].toLowerCase())
  const FILE_DIR = join(PATH_DIR, `${code[0].toLowerCase()}.json`)
  try {
    await access(PATH_DIR)
  } catch (err) {
    console.log(err)
    const customError = {
      process: 'generarRutaDataLeague',
      message:
        'La ruta al DIRECTORIO ' +
        code[0] +
        ' no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }

  try {
    await access(FILE_DIR)
  } catch (err) {
    const customError = {
      process: 'generarRutaDataLeague',
      message:
        'La ruta al ARCHIVO ' +
        code[0] +
        '.json no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }
  // Esta parte verifica que la season del data League, exista en el archivo {code}.json
  try {
    const data = await readFile(FILE_DIR, 'utf-8')
    const { response } = JSON.parse(data)

    const [ligaObtenida] = response.filter((l) => l.league.id === id[0])

    const [temporadaObtenida] = ligaObtenida.seasons.filter(
      (t) => t.year === season[0]
    )

    if (temporadaObtenida.length === 0) {
      throw new Error(
        'Ocurrio un error filtrando las ligas. La temporada' +
          season[0] +
          ' no se encuentra en la lista de recursos de ' +
          code[0] +
          '.json. Fijate si tenes que actualizar' +
          code[0] +
          ', o si la API contiene el dato solicitado :/ '
      )
    }
  } catch (err) {
    const customError = {
      process: 'generarRutaFixtures',
      message: err.message
    }
    throw customError
  }

  const SEASON_DIR = join(PATH_DIR, season[0].toString())
  const LEAGUE_DIR = join(SEASON_DIR, leagueCode[0].toLowerCase())
  try {
    await access(SEASON_DIR)
  } catch (error) {
    const checkMk = await createDir(SEASON_DIR)
    if (!checkMk.status) {
      console.log('Ocurrio un error inesperado')
      throw checkMk
    }
  }
  try {
    await access(LEAGUE_DIR)
  } catch (error) {
    const checkMk = await createDir(LEAGUE_DIR)
    if (!checkMk.status) {
      console.log('Ocurrio un error inesperado')
      throw checkMk
    }
  }

  const nameDataLeague = `data-${leagueCode[0]}-${season[0]}.json`
  const PATH_DATA_LEAGUE = join(LEAGUE_DIR, nameDataLeague)

  const pathFormateada = { PATH_COUNTRY: FILE_DIR, PATH_DATA_LEAGUE }

  return pathFormateada
}

async function generarRutaFixtures ({ id, season, code, leagueCode }) {
  /** Primero Buscamos el pais, y si tenemos el archivo json del pais */
  const PATH_DIR = join(DATA_PATH, code[0].toLowerCase())
  const FILE_DIR = join(PATH_DIR, `${code[0].toLowerCase()}.json`)

  try {
    await access(PATH_DIR)
  } catch (err) {
    console.log(err)
    const customError = {
      process: 'generarRutaFixtures',
      message:
        'La ruta al DIRECTORIO ' +
        code[0] +
        ' no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }

  try {
    await access(FILE_DIR)
  } catch (err) {
    const customError = {
      process: 'validateLeague',
      message:
        'La ruta al ARCHIVO ' +
        code[0] +
        '.json no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }
  try {
    const data = await readFile(FILE_DIR, 'utf-8')
    const { response } = JSON.parse(data)

    const [ligaObtenida] = response.filter((l) => l.league.id === id[0])

    const [temporadaObtenida] = ligaObtenida.seasons.filter(
      (t) => t.year === season[0]
    )

    if (temporadaObtenida.length === 0) {
      throw new Error(
        'Ocurrio un error filtrando las ligas. La temporada' +
          season[0] +
          ' no se encuentra en la lista de recursos de ' +
          code[0] +
          '.json. Fijate si tenes que actualizar' +
          code[0] +
          ', o si la API contiene el dato solicitado :/ '
      )
    }
  } catch (err) {
    const customError = {
      process: 'generarRutaFixtures',
      message: err.message
    }
    throw customError
  }

  const SEASON_DIR = join(PATH_DIR, season[0].toString())
  const LEAGUE_DIR = join(SEASON_DIR, leagueCode[0].toLowerCase())
  try {
    await access(SEASON_DIR)
  } catch (error) {
    const checkMk = await createDir(SEASON_DIR)
    if (!checkMk.status) {
      console.log('Ocurrio un error inesperado')
      throw checkMk
    }
  }
  try {
    await access(LEAGUE_DIR)
  } catch (error) {
    const checkMk = await createDir(LEAGUE_DIR)
    if (!checkMk.status) {
      console.log('Ocurrio un error inesperado')
      throw checkMk
    }
  }

  try {
    const nameFileFixture = `fixtures-${leagueCode[0]}-${season[0]}.json`
    const nameFileRounds = `rounds-${nameFileFixture}`
    const PATH_FIXTURE = join(LEAGUE_DIR, nameFileFixture)
    const PATH_ROUNDS = join(LEAGUE_DIR, nameFileRounds)
    const pathFormateada = { PATH_FIXTURE, PATH_ROUNDS }

    return pathFormateada
  } catch (error) {

  }
}

async function generarRutaStandings ({ id, season, code, leagueCode }) {
  /** Primero Buscamos el pais, y si tenemos el archivo json del pais */
  const PATH_DIR = join(DATA_PATH, code[0].toLowerCase())
  const FILE_DIR = join(PATH_DIR, `${code[0].toLowerCase()}.json`)

  try {
    await access(PATH_DIR)
  } catch (err) {
    console.log(err)
    const customError = {
      process: 'generarRutaStandings',
      message:
        'La ruta al DIRECTORIO ' +
        code[0] +
        ' no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }

  try {
    await access(FILE_DIR)
  } catch (err) {
    const customError = {
      process: 'validateLeague',
      message:
        'La ruta al ARCHIVO ' +
        code[0] +
        '.json no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }
  try {
    const data = await readFile(FILE_DIR, 'utf-8')
    const { response } = JSON.parse(data)

    const [ligaObtenida] = response.filter((l) => l.league.id === id[0])

    const [temporadaObtenida] = ligaObtenida.seasons.filter(
      (t) => t.year === season[0]
    )

    if (temporadaObtenida.length === 0) {
      throw new Error(
        'Ocurrio un error filtrando las ligas. La temporada' +
          season[0] +
          ' no se encuentra en la lista de recursos de ' +
          code[0] +
          '.json. Fijate si tenes que actualizar' +
          code[0] +
          ', o si la API contiene el dato solicitado :/ '
      )
    }
  } catch (err) {
    const customError = {
      process: 'generarRutaStandings',
      message: err.message
    }
    throw customError
  }

  const SEASON_DIR = join(PATH_DIR, season[0].toString())
  const LEAGUE_DIR = join(SEASON_DIR, leagueCode[0].toLowerCase())
  try {
    await access(SEASON_DIR)
  } catch (error) {
    const checkMk = await createDir(SEASON_DIR)
    if (!checkMk.status) {
      const customError = {
        process: 'generarRutaStandings',
        message: error.message
      }
      throw customError
    }
  }
  try {
    await access(LEAGUE_DIR)
  } catch (error) {
    const checkMk = await createDir(LEAGUE_DIR)
    if (!checkMk.status) {
      const customError = {
        process: 'generarRutaStandings',
        message: error.message
      }
      throw customError
    }
  }

  try {
    const nameFileStanding = `standings-${leagueCode[0]}-${season[0]}.json`
    const PATH_STANDING = join(LEAGUE_DIR, nameFileStanding)
    const pathFormateada = { PATH_STANDING }

    return pathFormateada
  } catch (error) {

  }
}

/** Metodos GET */
async function generarRutasLigas ({ country, season, league }) {
  const nameFileStand = `standings-${league}-${season}.json`
  const nameFileFixture = `fixtures-${league}-${season}.json`
  const nameFileRounds = `rounds-${nameFileFixture}`
  const RUTA_VALIDADA = join(DATA_PATH, country, season, league)
  const PATH_STANDING = join(RUTA_VALIDADA, nameFileStand)
  const PATH_FIXTURE = join(RUTA_VALIDADA, nameFileFixture)
  const PATH_ROUNDS = join(RUTA_VALIDADA, nameFileRounds)

  const pathsFormateadas = {}
  try {
    await access(PATH_STANDING)
    pathsFormateadas.standing = PATH_STANDING
  } catch (err) {
    pathsFormateadas.standing = false
  }
  try {
    await access(PATH_FIXTURE)
    pathsFormateadas.fixture = PATH_FIXTURE
  } catch (err) {
    pathsFormateadas.fixture = false
  }
  try {
    await access(PATH_ROUNDS)
    pathsFormateadas.rounds = PATH_ROUNDS
  } catch (err) {
    pathsFormateadas.rounds = false
  }

  return pathsFormateadas
}
module.exports = { generarRutaPais, generarRutaFixtures, generarRutaDataLeague, generarRutaStandings, generarRutasLigas }
