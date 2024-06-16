/* eslint-disable n/no-path-concat */
/* eslint-disable no-unused-vars */
const axios = require('axios')
const { writeFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { processCreateLinks } = require('./processCreate/processCreateLinks')
const { processCreateFixtures } = require('./processCreate/processCreateFixtures')
const { processCreateStandings } = require('./processCreate/processCreateStandings')

const DATA_PATH = resolve(__dirname, '../data')
const API_KEY = process.env.API_SPORTS
// TODO - Fijate de poner el axios en los process, verificar si los directorios y archivos no existen,
// y ahi recien hacer el axios y crear los archivos.
// Porque probando y probando las funciones de procceso, consumiste el 75% de la api sin darte cuenta -_-

async function createLinks ({ country, id }) {
  try {
    const createFile = await processCreateLinks({ country, id })
    if (createFile.isCustomError) {
      throw createFile
    }
    return { message: createFile.message }
  } catch (err) {
    return { error: err }
  }
}

async function createFixtures ({ league, season, country }) {
  try {
    const createFile = await processCreateFixtures(league, season, country)
    // if (createFile.isCustomError) {
    //   throw createFile
    // }
    return { message: createFile.message }
  } catch (err) {
    return { error: err }
  }
}

async function createStandings ({ league, season, country }) {
  try {
    const createFile = await processCreateStandings(league, season, country)
    // if (createFile.isCustomError) {
    //   throw createFile
    // }
    return { message: createFile.message }
  } catch (err) {
    return { error: err }
  }
}

//* Este no sirve, pero todavia no lo voy a borrar
// async function createLinks (country, nameFile, ...ids) {
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
// createCompetenciasWorld('World', 'conmebol', 13, 11, 541)
// createCompetenciasWorld('World', 'uefa', 2, 3, 848, 531)
// createCompetenciasWorld('World', 'fifa', 1, 15)

module.exports = {
  createLinks,
  createFixtures,
  createStandings
}
