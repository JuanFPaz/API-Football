const axios = require('axios')
const { writeFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

const API_KEY = process.env.API_SPORTS

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

// createCompetenciasWorld('World', 'conmebol', 13, 11, 541)
createCompetenciasWorld('World', 'uefa', 2, 3, 848, 531)
