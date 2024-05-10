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

module.exports = {
  axionLinks
}
