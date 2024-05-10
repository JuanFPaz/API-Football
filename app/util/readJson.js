/* eslint-disable no-undef */
/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { processGetLinksArg, processGetLinksEng, processGetLinksCups } = require('./processRead/processReadLinks')
const { processGetStanding } = require('./processRead/processReadStandings')
const { processGetFixtures } = require('./processRead/processReadFixtures')
const { bgWhite } = require('picocolors')

/* EN LOS GET DATA TAMBIEN PUEDEN OCURRIR ERRORES, ASI QUE CUIDAO */
async function getDataLeague ({ country, season, nameLeague, nameData }) {
  let data
  try {
    const [{ standings }, { fixtures }] = await Promise.all([processGetStanding(country, season, nameLeague, nameData[0]), processGetFixtures(country, season, nameLeague, nameData[1])])
    data = [{ standings, fixtures }]
    console.log(data)
  } catch (err) {
    /* TODO, Verificar si es un error interno de processFunction u otro error. O manejar el error que venga del proccess de otra forma :/ */
    console.error(err.message)
    console.error('Retornamos un error intero :/')
    return { error: err }
  }
  return data
}

async function getDataCup ({ country, season, nameLeague, nameData }) {
  let data
  try {
    const [{ standings }, { fixtures }] = await Promise.all([processGetStanding(country, season, nameLeague, nameData[0]), processGetFixtures(country, season, nameLeague, nameData[1])])
    data = [{ standings, fixtures }]
    console.log(process)
  } catch (err) {
    console.error('Retornamos un error intero :/')
    return { error: err }
  }

  return data
}

async function getDataMatch () {
  // Solicitud para tener los datos de un partido en especifico solicitado por el usaurio
  // Ej: Boca vs RiBer
}

async function getLinks () {
  let data
  try {
    data = await Promise.all([
      processGetLinksArg(),
      processGetLinksEng(),
      processGetLinksCups('conmebol'),
      processGetLinksCups('uefa')
    ])
  } catch (err) {
    if (err.isCustomError) {
      console.log(bgWhite('Ocurrio un Custom Error:'))
      return { error: err }
    }
    console.log(bgWhite('Ocurrio un Error:'))
    return { error: { procces: 'GetLinks', message: err.message, reference: 'Ocurrio antes de leer los datos' } }
  }
  return data
}

module.exports = {
  getLinks,
  getDataLeague,
  getDataCup
}
