const fs = require('node:fs/promises')
const path = require('node:path')

const DATA_PATH = path.resolve(__dirname, '../data')

console.log(DATA_PATH)

function ligaArgentina () {
  const CURRENT_SEASON = path.join(DATA_PATH, 'season-actual', 'argentina', 'competencias-argentina.json')
  fs.readFile(CURRENT_SEASON, 'utf-8')
    .then(data => {
      console.log(JSON.parse(data))
    })
}

ligaArgentina()
