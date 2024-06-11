const { writeFile, access, mkdir } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { axionStandings } = require('../../helpers/axion')

const DATA_PATH = resolve(__dirname, '../../data')

async function processCreateStandings (...params) {
  let countryName
  let nameDir
  let nameSeasonDir
  let nameLeague
  let leagueId
  let seasonId
  let NAME_FILE
  try {
    const [league, season, country] = params
    countryName = country[0]
    nameDir = countryName.toLowerCase()
    nameSeasonDir = season.toString()
    leagueId = league
    seasonId = season
  } catch (err) {
    const customError = {
      isCustomError: true,
      procces: 'processCreateLinks',
      reference: 'Ocurrio un error desestructurando el arreglo de Params en el processCreateLinks',
      message: err.message
    }
    throw customError
  }

  const PATH_DIR = join(DATA_PATH, nameDir, 'season', nameSeasonDir)

  try {
    /* Primero verificamos si el directorio app/data/nameFile/ existe, porque sino, da un error y explota todo */
    await access(PATH_DIR) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
  } catch (err) {
    if (err.code !== 'ENOENT') {
      const customError = {
        isCustomError: true,
        procces: 'processCreateLinks',
        reference: 'Ocurrio un error Creando el directorio ' + nameDir,
        message: err.message
      }
      throw customError
    }
  }

  try {
    await mkdir(PATH_DIR)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      const customError = {
        isCustomError: true,
        procces: 'processCreateLinks',
        reference: 'Ocurrio un error Creando el directorio ' + nameDir,
        message: err.message
      }
      throw customError
    }
  }

  try {
    const { data } = await axionStandings(leagueId, seasonId)
    const { get, response: [{ league: { name } }] } = data
    nameLeague = name.toLowerCase().replace(/\s/g, '-')
    const nameFile = `${get}-${nameLeague}-${nameSeasonDir}.json`
    NAME_FILE = join(PATH_DIR, nameLeague, nameFile)
    await writeFile(NAME_FILE, JSON.stringify(data))

    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (err) {
    const customError = {
      isCustomError: true,
      procces: 'processCreateLinks',
      reference: 'Ocurrio un error Creando el directorio ' + NAME_FILE,
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  processCreateStandings
}
