/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { json } = require('express')
const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

console.log(DATA_PATH)

function getLinksArgentina () {
  const CURRENT_SEASON = join(DATA_PATH, 'season-actual', 'argentina', 'competencias-argentina.json')
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

function getCopaLigaProfData () {
  const CURRENT_CUP = join(DATA_PATH, 'season-actual', 'argentina', 'copa-de-liga', 'copa-liga-profesional-2024')
  const CURRENT_FIXTURE = join(CURRENT_CUP, 'fixture-copa-liga-prof-2024.json')
  const CURRENT_ROUNDS = join(CURRENT_CUP, 'fixture-rounds-copa-liga-prof-2024.json')
  const CURRENT_STANDING = join(CURRENT_CUP, 'tabla-copa-liga-prof-2024.json')

  const standing = readFile(CURRENT_STANDING, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response }) => {
      console.log(response)
    })

  return Promise.all([standing])
}

getCopaLigaProfData().then(d => { console.log(d) })
function getLinksCONMEBOL () {

}

function getLinksUEFA () {

}

function getLinksPrincipal () {
  return Promise.all([
    getLinksArgentina()
  ])
}

module.exports = {
  getLinksPrincipal
}
