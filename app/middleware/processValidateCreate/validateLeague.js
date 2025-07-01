const createDir = require('../../helpers/createDir')
const { readFile, access } = require('node:fs/promises')
const { join, resolve } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function validateLeague ({ country, league, season }) {
  const PATH_DIR = join(DATA_PATH, country[0].toLowerCase())
  const FILE_DIR = join(PATH_DIR, `${country[0].toLowerCase()}.json`)
  let leagueFilter

  try {
    await access(PATH_DIR)
  } catch (err) {
    console.log(err)
    const customError = {
      process: 'validateLeague',
      message: 'La ruta al DIRECTORIO ' + country[0] + ' no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }

  try {
    await access(FILE_DIR)
  } catch (err) {
    const customError = {
      process: 'validateLeague',
      message: 'La ruta al ARCHIVO ' + country[0] + '.json no es valida. Fijate de pasar el nombre correctamente, o previamente haber obtenido los datos usando el endpoint /links.'
    }
    throw customError
  }

  try {
    const data = await readFile(FILE_DIR, 'utf-8')
    const { response } = JSON.parse(data)

    /* Full recursivida pa */
    leagueFilter = await Promise.all(league.map(async (l) => {
      const lf = response.filter(le => le.league.id === l)
      if (lf.length === 0) {
        throw new Error('Ocurrio un error filtrando las ligas. El ID ' + l + ' no es valido para el country ' + country[0] + '.')
      }
      const [liga] = lf
      console.log(liga)

      const { league: { name }, seasons } = liga
      const seasonFilter = await Promise.all(season.map(async (s) => {
        const sf = seasons.filter(se => se.year === s)
        const [temporada] = sf
        if (sf.length === 0) {
          throw new Error('Ocurrio un error filtrando la liga ' + name + '. La Season ' + s + ' no es valido.')
        }
        const { year, coverage: { fixtures, standings } } = temporada
        return { year, fixtures, standings }
      }))

      return { name: name.toLowerCase().replace(/\s/g, '-'), seasons: seasonFilter }
    }))
  } catch (err) {
    const customError = {
      process: 'validateLeague',
      message: err.message
    }
    throw customError
  }

  const SEASONS_DIR = season.map(s => join(PATH_DIR, s.toString()))

  const LEAGUE_DIR = leagueFilter.map(l => {
    const SD = SEASONS_DIR.map(s => join(s, l.name))
    return SD
  }).reduce((acc, curr) => acc.concat(curr), [])

  for (const path of SEASONS_DIR) {
    try {
      await access(path)
    } catch (error) {
      const checkMk = await createDir(path)
      if (!checkMk.status) {
        console.log('Ocurrio un error inesperado')
        throw checkMk
      }
    }
  }

  for (const path of LEAGUE_DIR) {
    try {
      await access(path)
    } catch (error) {
      const checkMk = await createDir(path)
      if (!checkMk.status) {
        console.log('Ocurrio un error inesperado')
        throw checkMk
      }
    }
  }

  const pathsFiles = leagueFilter.map((l) => {
    const s = l.seasons.map((se) => {
      const nameFileStand = `standings-${l.name}-${se.year}.json`
      const nameFileFixture = `fixtures-${l.name}-${se.year}.json`
      const nameFileRounds = `rounds-${nameFileFixture}`
      const PATH_STANDING = join(PATH_DIR, se.year.toString(), l.name, nameFileStand)
      const PATH_FIXTURE = join(PATH_DIR, se.year.toString(), l.name, nameFileFixture)
      const PATH_ROUNDS = join(PATH_DIR, se.year.toString(), l.name, nameFileRounds)

      const pathsFormateadas = {}

      pathsFormateadas.pathStanding = PATH_STANDING
      pathsFormateadas.pathFixture = PATH_FIXTURE
      pathsFormateadas.pathRounds = PATH_ROUNDS
      return pathsFormateadas
    }).reduce((acc, curr) => acc.concat(curr), [])
    return s
  })

  return pathsFiles
}

module.exports = validateLeague
