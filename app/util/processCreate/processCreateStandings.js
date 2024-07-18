const { writeFile } = require('node:fs/promises')
const { axionStandings } = require('../../helpers/axion')

async function processCreateStandings ({ league, season, pathFiles }) {
  try {
    /*
      Por cada Liga, queremos hacer el axios por cada season:
    */
    await Promise.all(league.map(async (l, li) => {
      console.log('Comenzamos con el recorrido a la Liga Nº ID: ' + l)
      await Promise.all(season.map(async (s, si) => {
        console.log('Comenzamos a obtener los datos de la Liga Nº ID: ' + l + ' en la season' + s)
        const { data } = await axionStandings(l, s)
        console.log('Ahora vamos a escribir en cada archivo de cada season, el contenido obtenido.')
        await writeFile(pathFiles[li][si].pathStanding, JSON.stringify(data))
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

  // try {
  //   const { data } = await axionStandings(leagueId, seasonId)
  //   const { get, response: [{ league: { name } }] } = data
  //   nameLeague = name.toLowerCase().replace(/\s/g, '-')
  //   const nameFile = `${get}-${nameLeague}-${nameSeasonDir}.json`
  //   NAME_FILE = join(PATH_DIR, nameLeague, nameFile)
  //   await writeFile(NAME_FILE, JSON.stringify(data))

  //   return { message: 'Recurso creado correctamente, ponele (?' }
  // } catch (err) {
  //   const customError = {
  //     isCustomError: true,
  //     procces: 'processCreateLinks',
  //     reference: 'Ocurrio un error Creando el directorio ' + NAME_FILE,
  //     message: err.message
  //   }
  //   throw customError
  // }
}

module.exports = {
  processCreateStandings
}
