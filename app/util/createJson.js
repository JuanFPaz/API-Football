/* eslint-disable n/no-path-concat */
/* eslint-disable no-unused-vars */
const axios = require('axios')
const { writeFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { processCreateLinks, processCreateLinksWorld } = require('./processCreate/processCreateLinks')

const DATA_PATH = resolve(__dirname, '../data')
const API_KEY = process.env.API_SPORTS
// TODO - Fijate de poner el axios en los process, verificar si los directorios y archivos no existen,
// y ahi recien hacer el axios y crear los archivos.
// Porque probando y probando las funciones de procceso, consumiste el 75% de la api sin darte cuenta -_-

async function createLinks ({ country }) {
  try {
    const createFile = await processCreateLinks(country)
    if (createFile.isCustomError) {
      throw createFile
    }
    return { message: 'Miau' }
  } catch (err) {
    return { error: err }
  }
}

// async function createCompetenciasWorld (country, nameFile, ...ids) {
//   /* nanmeFIle sirve para el nombre del directori oy del archivo que estamos creando. Ej: data/uefa/uefa.json */
//   const arregloConfederacion = await Promise.all(ids.map(async (id) => {
//     const config = {
//       method: 'get',
//       url: `https://v3.football.api-sports.io/leagues?country=${country}&id=${id}`,
//       headers: {
//         'x-rapidapi-key': API_KEY,
//         'x-rapidapi-host': 'v3.football.api-sports.io'
//       }
//     }

//     const { data } = await axios(config)
//     return data
//   }))
//   const arregloParameters = arregloConfederacion.map(c => {
//     const { parameters } = c
//     return parameters
//   })
//   const arregloResponse = arregloConfederacion.map(c => {
//     const { response: [copa] } = c
//     return copa
//   })
//   const data = {
//     get: arregloConfederacion[0].get,
//     parameters: arregloParameters,
//     errors: arregloConfederacion[0].errors,
//     results: arregloResponse.length,
//     paging: arregloConfederacion[0].paging,
//     response: arregloResponse
//   }

//   processCreateLinksWorld(nameFile, data)
// }

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
  const nameCountry = params[2] ?? country.toLowerCase()
  const nameLeague = name.toLowerCase().replace(/\s/g, '-')
  const nameSeason = season.toString()
  const nameFile = `${get}-${nameLeague}-${nameSeason}.json`
  const DIR_PATH = join(DATA_PATH, nameCountry, 'season', nameSeason, nameLeague)
  await writeFile(`${DIR_PATH}/${nameFile}`, JSON.stringify(data))

  createFixtureRounds(DIR_PATH, nameFile, params[0], params[1])
}

async function createFixtureRounds (DIR_PATH, nameFile, ...params) {
  const config = {
    method: 'get',
    url: `https://v3.football.api-sports.io/fixtures/rounds?league=${params[0]}&season=${params[1]}`,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  }

  const { data } = await axios(config)
  await writeFile(`${DIR_PATH}/rounds-${nameFile}`, JSON.stringify(data))
}

// createFixture(848, 2023, 'uefa')
// createFixture(13, 2024, 'conmebol')
// createFixture(11, 2024, 'conmebol')

// createCompetenciasWorld('World', 'conmebol', 13, 11, 541)
// createCompetenciasWorld('World', 'uefa', 2, 3, 848, 531)
// createCompetenciasWorld('World', 'fifa', 1, 15)

module.exports = {
  createLinks
}
