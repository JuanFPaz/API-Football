/* eslint-disable no-unused-vars */
const { readFile, readdir } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function processGetLinks () {
  try {
    const DATA_DIR = await readdir(DATA_PATH, { withFileTypes: true })
    const PATH_DIR = DATA_DIR.filter(d => d.isDirectory()).map((dir) => {
      const rutaFormateada = join(dir.path, dir.name)
      return { path: rutaFormateada }
    })

    // Simulando mapeo/for
    const response = await Promise.all(PATH_DIR.map(async (PD) => {
      const COUNTRY_DIR = await readdir(PD.path, { withFileTypes: true })
      const [PAIS_FILE] = COUNTRY_DIR.filter(d => d.isFile()).map((dir) => {
        const rutaFormateada = join(dir.path, dir.name)
        return { path: rutaFormateada }
      })
      const _data = await readFile(PAIS_FILE.path, 'utf-8')
      const { response } = JSON.parse(_data)
      const [{ country }] = response

      const PATH_SEASON = COUNTRY_DIR.filter(d => d.isDirectory() && parseInt(d.name)).map((dir) => {
        const rutaFormateada = join(dir.path, dir.name)
        return { name: parseInt(dir.name), path: rutaFormateada }
      })

      switch (country.code.toLowerCase()) {
        case 'fifa':
        case 'conmebol': {
          const filtrando = response.map(element => {
            return { liga: element.league.name, id: element.league.id, season: element.seasons[element.seasons.length - 1].year }
          })
          const miau = await Promise.all(filtrando.map(async (fp) => {
            const [PATH_ACTUAL] = PATH_SEASON.filter(PS => PS.name === fp.season)
            const SEASON_DIR = await readdir(PATH_ACTUAL.path, { withFileTypes: true })
            const PATH_LIGAS = SEASON_DIR.filter(d => d.isDirectory()).map((dir) => {
              const rutaFormateada = join(dir.path, dir.name)
              return { path: rutaFormateada }
            })

            const PRUEBA = await Promise.all(PATH_LIGAS.map(async (PL) => {
              const LIGA_DIR = await readdir(PL.path, { withFileTypes: true })

              const [DATA_LIGA] = LIGA_DIR.filter(d => d.isFile()).map((dir) => {
                const rutaFormateada = join(dir.path, dir.name)
                return { path: rutaFormateada }
              })

              const __data = await readFile(DATA_LIGA.path, 'utf-8')

              const { dataLeague } = JSON.parse(__data)
              if (dataLeague.id === fp.id) {
                dataLeague.link = `http://localhost:3000/${dataLeague.code.toLowerCase()}/${dataLeague.season}/${dataLeague.codeLeague.toLowerCase()}`
                return dataLeague
              } else {
                return { borrar: true }
              }
            }))
            // console.log(PRUEBA[0].borrar)

            const [RESPUESTA_FINAL] = PRUEBA.filter(it => !it.borrar)
            return RESPUESTA_FINAL
          }))

          country.items = miau
          return { country }
        }
        default: {
          const SEASON_DIR = await readdir(PATH_SEASON[PATH_SEASON.length - 1].path, { withFileTypes: true })
          const PATH_LIGAS = SEASON_DIR.filter(d => d.isDirectory()).map((dir) => {
            const rutaFormateada = join(dir.path, dir.name)
            return { path: rutaFormateada }
          })
          const PRUEBA = await Promise.all(PATH_LIGAS.map(async (PL) => {
            const LIGA_DIR = await readdir(PL.path, { withFileTypes: true })
            const [DATA_LIGA] = LIGA_DIR.filter(d => d.isFile()).map((dir) => {
              const rutaFormateada = join(dir.path, dir.name)
              return { path: rutaFormateada }
            })
            const __data = await readFile(DATA_LIGA.path, 'utf-8')
            const { dataLeague } = JSON.parse(__data)
            dataLeague.link = `http://localhost:3000/${dataLeague.code.toLowerCase()}/${dataLeague.season}/${dataLeague.codeLeague.toLowerCase()}`
            return dataLeague
          }))

          country.items = PRUEBA
          return { country }
        }
      }
    }))

    // ACA VIENE EL RESPONSEE
    return response
  } catch (err) {
    const customError = {
      isCustomError: true,
      process: 'getLinksCups',
      reference: 'Ocurrio un asdas',
      message: err.message
    }
    throw customError
  }
}

module.exports = {
  processGetLinks
}
