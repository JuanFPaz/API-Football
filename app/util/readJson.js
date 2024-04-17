/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

console.log(DATA_PATH)

function getLinksArgentina () {
  const CURRENT_SEASON = join(DATA_PATH, 'argentina', 'argentina.json')
  return readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response }) => {
      console.log(response)
      // nombre a response como res, para evitar que se soobrescriban

      const [,,,,, ligaProfesional, copaArgentina, trofeoCampeones,, superCopa,, copaDeLaLiga] = response
      const list = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
      const listFormateada = list.map(l => {
        const { league, ...rest } = l
        return league
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
      console.log(response)
      const list = [...response]
      const listFormateada = list.map(l => {
        const { league, ...rest } = l
        return league
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
        const { league, ...rest } = l
        return league
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
  const DIR_PATH = join(DATA_PATH, 'argentina', 'season', '2024', 'liga-profesional-argentina', 'standings-liga-profesional-argentina-2024.json')
  const data = await readFile(DIR_PATH)
  const { response: [{ league: { standings: [stand] } }] } = JSON.parse(data)
  const standingFormateada = stand.map(e => {
    const { team, points, goalsDiff, all, home, away } = e
    return {
      team,
      points,
      goalsDiff,
      all,
      home,
      away
    }
  })

  const tablaInicial = standingFormateada.every(e => e.all.played === 0)

  if (tablaInicial) {
    return [{ standing: standingFormateada.sort((a, b) => (a.team.name > b.team.name) ? 1 : -1) }]
  }

  return [{ standing: standingFormateada }]
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
