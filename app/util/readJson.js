/* eslint-disable no-undef */
/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { processGetLinksArg, processGetLinksCups } = require('./processRead/processLinks')
const { processGetStanding } = require('./processRead/processStandings')
const { processGetFixtures } = require('./processRead/processFixtures')

/* EN LOS GET DATA TAMBIEN PUEDEN OCURRIR ERRORES, ASI QUE CUIDAO */
async function getDataLeague ({ country, season, nameLeague, nameData }) {
  /* TO DO: Capturar un error
   correctamente del promises all,
   porque si algo sale mal en algrun proceso,
   debemos capturarlo en el endpoint de la solicitud.
   Independientemente de que 3 de 4 procesos hayan salido bien
   no podemos devolver un procesos mal y 3 bien xd
  */
  let data
  try {
    data = await Promise.all([
      processGetStanding(country, season, nameLeague, nameData[0]),
      processGetFixtures(country, season, nameLeague, nameData[1])
    ])
    console.log('Todos los datos fueron obtenidos con exito')
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
    data = await Promise.all([processGetStanding(country, season, nameLeague, nameData[0]), processGetFixtures(country, season, nameLeague, nameData[1])])
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

async function getLinksPrincipal () {
  let data
  try {
    data = await Promise.all([
      processGetLinksArg(), // a, en el catch de processGetLinks me estan lanzando un error, tengo que capturarlo y mandarlo a mi catch
      processGetLinksCups('conmebol'),
      processGetLinksCups('uefa')
    ])
  } catch (err) {
    console.error('Retornamos un error intero :/')
    return { error: err }
  }
  return data
}

module.exports = {
  getLinksPrincipal,
  getDataLeague,
  getDataCup
}
