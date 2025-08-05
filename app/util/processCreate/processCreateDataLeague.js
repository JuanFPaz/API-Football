const { writeFile, readFile } = require('node:fs/promises')

async function proccesCreateDataLeague ({ id, season, code, leagueName, country, leagueCode, date, pathFiles }) {
  try {
    const dataCountry = await readFile(pathFiles.PATH_COUNTRY, 'utf-8')
    const parse = JSON.parse(dataCountry)
    const [ligaData] = parse.response.filter(lg => lg.league.id === id[0])

    console.log(ligaData)

    const data = {}
    let start
    let end
    if (!date) {
      start = ligaData.seasons[ligaData.seasons.length - 1].start
      end = ligaData.seasons[ligaData.seasons.length - 1].end
    } else {
      start = date[0]
      end = date[1]
    }
    data.dataLeague = {
      id: id[0],
      type: ligaData.league.type,
      name: leagueName[0],
      codeLeague: leagueCode[0],
      code: code[0],
      country: country[0],
      logo: ligaData.league.logo,
      flag: ligaData.country.flag,
      season: season[0],
      start,
      end,
      current: ligaData.seasons[ligaData.seasons.length - 1].current
    }

    await writeFile(pathFiles.PATH_DATA_LEAGUE, JSON.stringify(data))
    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (err) {
    const customError = {
      process: 'proccesCreateDataLeague',
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  proccesCreateDataLeague
}
