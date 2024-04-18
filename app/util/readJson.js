/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { log } = require('node:console')
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

function getLinksArgentina () {
  const CURRENT_SEASON = join(DATA_PATH, 'argentina', 'argentina.json')
  return readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response }) => {
      // nombre a response como res, para evitar que se soobrescriban

      const [,,,,, ligaProfesional, copaArgentina, trofeoCampeones,, superCopa,, copaDeLaLiga] = response
      const list = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
      const listFormateada = list.map(l => {
        const { league, seasons } = l

        const seasonsFormateada = seasons.map(s => {
          const { year, start, end, current } = s
          return { year, start, end, current }
        })
        return { league, seasons: seasonsFormateada }
      })
      const data = {
        country: {
          name: 'Argentina',
          code: 'AR',
          flag: 'https://media.api-sports.io/football/leagues/128.png'
        },
        list: listFormateada
      }
      return data
    })
}
function getLinksCONMEBOL () {
  const CURRENT_SEASON = join(DATA_PATH, 'conmebol', 'conmebol.json')
  return readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response }) => {
      const list = [...response]
      const listFormateada = list.map(l => {
        const { league, seasons } = l

        const seasonsFormateada = seasons.map(s => {
          const { year, start, end, current } = s
          return { year, start, end, current }
        })
        return { league, seasons: seasonsFormateada }
      })
      const data = {
        country: {
          name: 'CONMEBOL',
          code: null,
          flag: null
        },
        list: listFormateada
      }
      return data
    })
}
function getLinksUEFA () {
  const CURRENT_SEASON = join(DATA_PATH, 'uefa', 'uefa.json')
  return readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response }) => {
      const list = [...response]
      const listFormateada = list.map(l => {
        const { league, seasons } = l

        const seasonsFormateada = seasons.map(s => {
          const { year, start, end, current } = s
          return { year, start, end, current }
        })
        return { league, seasons: seasonsFormateada }
      })
      const data = {
        country: {
          name: 'UEFA',
          code: null,
          flag: null
        },
        list: listFormateada
      }
      return data
    })
}

async function getDataLeague () {
  const DIR_PATH = join(DATA_PATH, 'argentina', 'season', '2024', 'copa-de-la-liga-profesional', 'standings-copa-de-la-liga-profesional-2024.json')
  const data = await readFile(DIR_PATH)
  const { response: [{ league: { standings } }] } = JSON.parse(data)
  console.log(standings.length)
  const standingsFormateadas = standings.map(standing => {
    // Parece redundante pero no lo es, cada liga tiene una tabla, por ejemplo la copa de la liga es un arreglo con 2 tablas
    // Seguramente la champions y la libertadores tengan 1 arreglo con 8 tablas
    // y la liga es arreglo con 1 tabla
    // Podria crear un standing.length === 1, evitar hacer el siguiente MAP, pero no veo porque no lo puede hacer
    const standingFormateada = standing.map(equipo => {
      const { team, points, goalsDiff, all, home, away } = equipo
      return {
        team,
        points,
        goalsDiff,
        all,
        home,
        away
      }
    })
    return standingFormateada
  })

  /* agrego nueva sentencia para reducir los standings en un solo arreglo, y hacer el every: */
  const equipos = standingsFormateadas.reduce((acc, curr) => acc.concat(curr), [])
  console.log(standingsFormateadas)
  const partidosJugados = equipos.every(e => e.all.played === 0)
  // const tablaInicial = standingFormateada.every(e => e.all.played === 0)

  if (partidosJugados) {
    const standingsSorteadas = standingsFormateadas.map(standing => {
      return standing.sort((a, b) => (a.team.name > b.team.name) ? 1 : -1)
    })
    return [{ standing: standingsSorteadas }]
  }

  // aca agregariamos el fixture, etx
  return [{ standing: standingsFormateadas }]
}

getDataLeague()

function getLinksPrincipal () {
  return Promise.all([
    getLinksArgentina(),
    getLinksCONMEBOL(),
    getLinksUEFA()
  ])
}

module.exports = {
  getLinksPrincipal,
  getDataLeague
}
