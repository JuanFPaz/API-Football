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
async function createStanding () {
  const config = {
    method: 'get',
    url: 'https://v3.football.api-sports.io/standings?league=128&season=2024',
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

async function createFixture () {
  const config = {
    method: 'get',
    url: 'https://v3.football.api-sports.io/fixtures?league=128&season=2024',
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

  createFixtureRounds(DIR_PATH, nameFile)
}

createFixture()

async function createFixtureRounds (DIR_PATH, nameFile) {
  const config = {
    method: 'get',
    url: 'https://v3.football.api-sports.io/fixtures/rounds?league=128&season=2024',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const { data } = await axios(config)
  await writeFile(DIR_PATH + '/rounds-' + nameFile, JSON.stringify(data))
}

// async function probando () {
//   const data = await readFile(__dirname + '/miau.json')
//   const { get, response: [{ league: { name, country, season } }] } = JSON.parse(data)
//   console.log(get)
//   console.log(name)

//   const { response: [{ league: { season } }] } = JSON.parse(data)
//   const { get } = JSON.parse(data)
//   const nameLeague = name.toLowerCase().replace(/\s/g, '-')
//   const nameSeason = season.toString()
//   const nameFile = `${get}-${nameLeague}-${nameSeason}.json`
//   console.log(nameFile)
// }
// probando()

// createStanding()
// createCompetenciasWorld('World', 'conmebol', 13, 11, 541)
// createCompetenciasWorld('World', 'uefa', 2, 3, 848, 531)
