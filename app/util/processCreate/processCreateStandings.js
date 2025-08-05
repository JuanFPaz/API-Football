const { writeFile } = require('node:fs/promises')
const { axionStandings } = require('../../helpers/axion')

async function processCreateStandings ({ id, season, code, leagueName, country, leagueCode, date, pathFiles }) {
  try {
    const { data } = await axionStandings(id[0], season[0])
    const { response: [ligaData] } = data
    ligaData.league.name = leagueName[0]
    ligaData.league.codeLeague = leagueCode[0]
    ligaData.league.country = country[0]
    ligaData.league.code = code[0]
    data.response = [ligaData]

    await writeFile(pathFiles.PATH_STANDING, JSON.stringify(data))
    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (err) {
    const customError = {
      process: 'processCreateStandings',
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  processCreateStandings
}
