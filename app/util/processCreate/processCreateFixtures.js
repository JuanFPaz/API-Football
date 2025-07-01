/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
const { writeFile } = require('node:fs/promises')
const { axionFixtures, axionFixturesRounds } = require('../../helpers/axion')

async function processCreateFixtures ({ league, season, pathFiles }) {
  try {
    /*
      Por cada Liga, queremos hacer el axios por cada season:
    */
    await Promise.all(league.map(async (l, li) => {
      // console.log('Comenzamos con el recorrido a la Liga Nº ID: ' + l)
      await Promise.all(season.map(async (s, si) => {
        // console.log('Comenzamos a obtener los datos de la Liga Nº ID: ' + l + ' en la season' + s)
        const { data } = await axionFixtures(l, s)
        // console.log('Ahora vamos a escribir en cada archivo de cada season, el contenido obtenido.')
        await writeFile(pathFiles[li][si].pathFixture, JSON.stringify(data))

        const { data: dataRounds } = await axionFixturesRounds(l, s)

        // console.log('Ahora vamos a escribir en cada archivo de cada season, el contenido obtenido.')
        await writeFile(pathFiles[li][si].pathRounds, JSON.stringify(dataRounds))
      }))
    }))
    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (err) {
    const customError = {
      process: 'processCreateFixture',
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  processCreateFixtures
}
