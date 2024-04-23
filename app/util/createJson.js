/* eslint-disable n/no-path-concat */
/* eslint-disable no-unused-vars */
const axios = require('axios')
const { writeFile, readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

const API_KEY = process.env.API_SPORTS

/* Las competencias por paises xd (aunque uefa y conmebol no sean pasises) */
function algo () {
  async function processResponse (data) {
    const { parameters: { country } } = data
    const nameFile = country.toLowerCase()
    const PATH_FILE = join(DATA_PATH, nameFile)
    await writeFile(`${PATH_FILE}/${nameFile}.json`, JSON.stringify(data))
  }

  async function processResponseWorld (nameFile, data) {
    const PATH_FILE = join(DATA_PATH, nameFile)
    await writeFile(`${PATH_FILE}/${nameFile}.json`, JSON.stringify(data))
  }

  async function createCompetencias (country) {
    const config = {
      method: 'get',
      url: `https://v3.football.api-sports.io/leagues?country=${country}`,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    }

    const { data } = await axios(config)
    processResponse(data)
  }

  async function createCompetenciasWorld (country, nameFile, ...ids) {
    const arregloConfederancion = await Promise.all(ids.map(async (id) => {
      const config = {
        method: 'get',
        url: `https://v3.football.api-sports.io/leagues?country=${country}&id=${id}`,
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      }

      const { data } = await axios(config)
      return data
    }))
    const arregloParameters = arregloConfederancion.map(c => {
      const { parameters } = c
      return parameters
    })
    const arregloResponse = arregloConfederancion.map(c => {
      const { response: [copa] } = c
      return copa
    })
    const data = {
      get: arregloConfederancion[0].get,
      parameters: arregloParameters,
      errors: arregloConfederancion[0].errors,
      results: arregloResponse.length,
      paging: arregloConfederancion[0].paging,
      response: arregloResponse
    }

    processResponseWorld(nameFile, data) // const config = {
    //   method: 'get',
    //   url: `https://v3.football.api-sports.io/leagues?country=${country}&id=${id}`,
    //   headers: {
    //     'x-rapidapi-key': API_KEY,
    //     'x-rapidapi-host': 'v3.football.api-sports.io'
    //   }
    // }
  }
}

/* Tablas - Fixtures - Fixtures Rounds y mas :D */

function createNameFile (data) {
  const { get, response: [{ league: { name, country, season } }] } = data
  const nameCountry = country.toLowerCase()
  const nameLeague = name.toLowerCase().replace(/\s/g, '-')
  const nameSeason = season.toString()
  const nameFile = `${get}-${nameLeague}-${nameSeason}.json`
  const DIR_PATH = join(DATA_PATH, nameCountry, 'season', nameSeason, nameLeague, nameFile)
  return DIR_PATH
}
async function createStanding (...params) {
  /* Forze llamarlo params, porque el nobmre season ya esta declarado abajo, y despues lo arreglo xd */
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/standings?league=${params[0]}&season=${params[1]}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const { data } = await axios(config)
  const { get, response: [{ league: { name, country, season } }] } = data
  const nameCountry = country.toLowerCase()
  const nameLeague = name.toLowerCase().replace(/\s/g, '-')
  const nameSeason = season.toString()
  const nameFile = `${get}-${nameLeague}-${nameSeason}.json`
  const DIR_PATH = join(DATA_PATH, nameCountry, 'season', nameSeason, nameLeague)
  await writeFile(DIR_PATH + '/' + nameFile, JSON.stringify(data))
}

async function createFixture (...params) {
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/fixtures?league=${params[0]}&season=${params[1]}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const { data } = await axios(config)
  const { get, response: [{ league: { name, country, season } }] } = data
  const nameCountry = country.toLowerCase()
  const nameLeague = name.toLowerCase().replace(/\s/g, '-')
  const nameSeason = season.toString()
  const nameFile = `${get}-${nameLeague}-${nameSeason}.json`
  const DIR_PATH = join(DATA_PATH, nameCountry, 'season', nameSeason, nameLeague)
  await writeFile(DIR_PATH + '/' + nameFile, JSON.stringify(data))

  createFixtureRounds(DIR_PATH, nameFile, params[0], params[1])
}

async function createFixtureRounds (DIR_PATH, nameFile, ...params) {
  console.log(params)
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/fixtures/rounds?league=${params[0]}&season=${params[1]}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const { data } = await axios(config)
  await writeFile(DIR_PATH + '/rounds-' + nameFile, JSON.stringify(data))
}

createFixture(130, 2024)
createFixture(517, 2024)
createFixture(810, 2024)

// createFixture(1032, 2024)
// createStanding()
// createCompetenciasWorld('World', 'conmebol', 13, 11, 541)
// createCompetenciasWorld('World', 'uefa', 2, 3, 848, 531)
