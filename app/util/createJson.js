const axios = require('axios')
const { write } = require('node:fs')
const { writeFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

const API_KEY = process.env.API_SPORTS

async function escribirJSON (country, data) {
  await writeFile(DATA_PATH + '/season-antiguas/2023/' + country + '/competencias-' + country + '-2023.json', data)
  console.log('Recurso creado con exito')
}

/* PARA LAS CURRENT SEASONS XD */

/* PARA LAS SEASONS VIEJAS */
async function createCompetencias (country) {
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/leagues?country=${country}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const response = await axios(config)
  escribirJSON(country.toLowerCase(), JSON.stringify(response.data))
}

// async function createLigasArgentinas (...params) {
//   const [route, idLeague, idSeason] = params
//   const config = {
//     method: 'get',
//     url: `https://v3.football.api-sports.io/${route}?league=${idLeague}&season=${idSeason}`,
//     headers: {
//       'x-rapidapi-key': API_KEY,
//       'x-rapidapi-host': 'v3.football.api-sports.io'
//     }
//   }

//   const response = await axios(config)

//   console.log(response.data)
// }

createCompetencias('Argentina')
