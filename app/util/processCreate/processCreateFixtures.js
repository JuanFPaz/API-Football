/* eslint-disable no-unused-vars */
const { writeFile, access, mkdir } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { axionFixtures, axionFixturesRounds } = require('../../helpers/axion')

const DATA_PATH = resolve(__dirname, '../../data')

async function processCreateFixtures (...params) {
  let countryName
  let nameDir
  let nameSeasonDir
  let leagueId
  let seasonId

  /* Primero creamos las variables del directrio
  tipo
    UEFA -> SEASON -> 2023
    */

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
    await access(PATH_DIR) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
  } catch (err) {
    if (err.code !== 'ENOENT') {
      const customError = {
        isCustomError: true,
        procces: 'processCreateLinks',
        reference: 'Ocurrio un error Creando el directorio ' + nameSeasonDir,
        message: err.message
      }
      throw customError
    }
  }

  /** Con fixtures primero hacemos el axios,
   *  obtenemos el name y el get y verificamos los directorios :3
   *  Por eso creo que seria lo mejor cambiar los nombre de los archivos, por no se, los IDS, o lo que sea, en ves de nombres especificos xd,
   * para verificar si existen ANTES dehacer el axios
   * */
  try {
    const { data } = await axionFixtures(leagueId, seasonId)
    const { get, response: [{ league: { name } }] } = data
    const nameLeague = name.toLowerCase().replace(/\s/g, '-')
    const nameFile = `${get}-${nameLeague}-${nameSeasonDir}.json`
    const NAME_FILE = join(PATH_DIR, nameLeague, nameFile)
    await writeFile(NAME_FILE, JSON.stringify(data))

    const { data: dataRounds } = await axionFixturesRounds(leagueId, seasonId)
    const nameRoundFile = `rounds-${nameFile}`
    const NAME_ROUNDS_FILE = join(PATH_DIR, nameLeague, nameRoundFile)
    await writeFile(NAME_ROUNDS_FILE, JSON.stringify(dataRounds))
    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  processCreateFixtures
}
