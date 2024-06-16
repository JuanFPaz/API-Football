/* eslint-disable promise/param-names */
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
  const [country, ids] = params
  const arregloDeLinks = await Promise.all(ids.map(async (id) => {
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

  return arregloDeLinks
}

// Si mal no me acuerdo, este era para World/Conmebol y World/Uefa
// async function axionLinksId (...params) {
//   const [country, id] = params
//   const config = {
//     method: 'get',
//     url: `https://v3.football.api-sports.io/leagues?country=${country}&id=${id}`,
//     headers: {
//       'x-rapidapi-key': API_KEY,
//       'x-rapidapi-host': 'v3.football.api-sports.io'
//     }
//   }

//   return axios(config)
// }

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
