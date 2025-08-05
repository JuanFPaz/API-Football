/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
const { writeFile } = require('node:fs/promises')
const { axionFixtures, axionFixturesDates, axionFixturesRounds } = require('../../helpers/axion')

async function processCreateFixtures ({ id, season, code, leagueName, country, leagueCode, date, roundsUpdate, pathFiles }) {
  // Creamos los fixtures
  try {
    let _data
    if (!date) {
      const { data } = await axionFixtures(id[0], season[0])
      _data = data
    } else {
      const { data } = await axionFixturesDates(id[0], season[0], date)
      _data = data
    }
    const { response } = _data

    const responseEdit = response.map((fx) => {
      const { fixture, league, teams, goals, score } = fx
      league.name = leagueName[0]
      league.codeLeague = leagueCode[0]
      league.country = country.length === 0 ? league.country : country[0]
      league.code = code[0]
      return { fixture, league, teams, goals, score }
    })

    _data.response = responseEdit

    await writeFile(pathFiles.PATH_FIXTURE, JSON.stringify(_data))
  } catch (err) {
    const customError = {
      process: 'processCreateFixture',
      message: err.message
    }
    throw customError
  }

  // Creamos los fixtures rounds
  try {
    if (roundsUpdate[0]) {
      const { data } = await axionFixturesRounds(id[0], season[0])

      await writeFile(pathFiles.PATH_ROUNDS, JSON.stringify(data))
    }
  } catch (err) {
    const customError = {
      process: 'processCreateFixture',
      message: err.message
    }
    throw customError
  }
  return { message: 'Recurso creado correctamente, ponele (?' }
}

module.exports = {
  processCreateFixtures
}
