const axios = require('axios')
const API_KEY = process.env.API_SPORTS

async function axionLinks (country) {
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/leagues?country=${country}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  return axios(config)
}

async function axionLinksIds (...params) {
  const [ids] = params
  const arregloDeLinks = await Promise.all(ids.map(async (id) => {
    const config = {
      method: 'get',
      url: `https://v3.football.api-sports.io/leagues?&id=${id}`,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    }

    const { data } = await axios(config)
    return data
  }))

  return arregloDeLinks
}

async function axionFixtures (...params) {
  const [league, season] = params

  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  return axios(config)
}

async function axionFixturesRounds (...params) {
  const [league, season] = params

  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/fixtures/rounds?league=${league}&season=${season}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  return axios(config)
}

async function axionStandings (...params) {
  const [league, season] = params

  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  return axios(config)
}

module.exports = {
  axionLinks,
  axionLinksIds,
  axionFixtures,
  axionFixturesRounds,
  axionStandings
}
