const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../data')

console.log(DATA_PATH)

function ligaArgentina () {
  const CURRENT_SEASON = join(DATA_PATH, 'season-actual', 'argentina', 'competencias-argentina.json')
  return readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      return JSON.parse(data)
    })
    .then(({ response: res }) => {
      // nombre a response como res, para evitar que se soobrescriban

      const [,,,,, ligaProfesional, copaArgentina, trofeoCampeones,, superCopa,, copaDeLaLiga] = res
      const response = [ligaProfesional, copaDeLaLiga, copaArgentina, superCopa, trofeoCampeones]
      const data = {
        timestamp: Date.now(),
        response
      }
      return data
    })
    // todo acordarte como lanzar u nerror correctamente xd
}

ligaArgentina().then(d => {
  console.log(d)
})

module.exports = {
  ligaArgentina
}
