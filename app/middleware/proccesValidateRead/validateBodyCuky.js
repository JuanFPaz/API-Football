const { access } = require('node:fs/promises')
const { join, resolve } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function validateBodyCuky ({ country, league, season, fixture, standing }) {
  const nameFileStand = `standings-${league}-${season}.json`
  const nameFileFixture = `fixtures-${league}-${season}.json`
  const nameFileRounds = `rounds-${nameFileFixture}`
  const PATH_COUNTRY = join(DATA_PATH, country)
  const PATH_SEASON = join(PATH_COUNTRY, season)
  const PATH_LEAGUE = join(PATH_SEASON, league)
  const PATH_STANDING = join(PATH_LEAGUE, nameFileStand)
  const PATH_FIXTURE = join(PATH_LEAGUE, nameFileFixture)
  const PATH_ROUNDS = join(PATH_LEAGUE, nameFileRounds)

  try {
    await access(PATH_COUNTRY)
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error buscando la ruta a /' + country + '. Parece que el directorio no existe.',
      process: 'validateBodyCuky',
      message: err
    }
    throw customError
  }
  try {
    await access(PATH_SEASON)
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error buscando la ruta a /' + country + '/' + season + '. Parece que el directorio no existe.',
      process: 'validateBodyCuky',
      message: err
    }
    throw customError
  }
  try {
    await access(PATH_LEAGUE)
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error buscando la ruta a /' + country + '/' + season + '/' + league + '. Parece que el directorio no existe.',
      process: 'validateBodyCuky',
      message: err
    }
    throw customError
  }

  const pathsFormateadas = {}

  try {
    if (!standing) {
      pathsFormateadas.pathStanding = standing
    } else {
      await access(PATH_STANDING)
      pathsFormateadas.pathStanding = PATH_STANDING
    }
  } catch (err) {
    const customError = {
      reference: `Ocurrio un error buscando el archivo standing de la ${league}`,
      process: 'validateData',
      message: err
    }
    throw customError
  }

  try {
    if (!fixture) {
      pathsFormateadas.pathFixture = fixture
    } else {
      await access(PATH_FIXTURE)
      pathsFormateadas.pathFixture = PATH_FIXTURE
    }
  } catch (err) {
    const customError = {
      reference: `Ocurrio un error buscando el archivo fixture de la ${league}`,
      process: 'validateData',
      message: err
    }
    throw customError
  }

  try {
    if (!fixture) {
      pathsFormateadas.pathRounds = false
    } else {
      await access(PATH_ROUNDS)
      pathsFormateadas.pathRounds = PATH_ROUNDS
    }
  } catch (err) {
    const customError = {
      reference: `Ocurrio un error buscando el archivo fixture round de la ${league}`,
      process: 'validateData',
      message: err
    }
    throw customError
  }

  return pathsFormateadas
}

module.exports = validateBodyCuky
