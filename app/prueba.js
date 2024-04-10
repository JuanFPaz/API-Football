const axios = require('axios');
const path = require('node:path')
const fs = require('node:fs/promises')

const config = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/status',
  headers: {
    'x-rapidapi-key': 'API_KEY',
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
};

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// async function getStatus(){
//     const response = await axios(config)
//     writeJSONStatus(JSON.stringify(response.data))
// }

async function writeJSONStatus(data){
    await fs.writeFile('./fixture-copa-arg-2024.json',data)
    console.log('Se creo la data');
}

// getStatus()

// Probar el dir

function logDirName(){
    console.log(__dirname)
    console.log(__filename);
}

//Modulo Path
function verPathDelArchivo(){
    const dirPath = path.join(__dirname)
    console.log(dirPath);
}
module.exports = {
    logDirName,
    verPathDelArchivo
}

async function getLigasArgentina(){
    const config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/fixtures?league=130&season=2024',
        headers: {
          'x-rapidapi-key': 'API_KEY',
          'x-rapidapi-host': 'v3.football.api-sports.io'
        }
      };

        const response = await axios(config)
        writeJSONStatus(JSON.stringify(response.data))
    }

    getLigasArgentina()