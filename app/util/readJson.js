/* eslint-disable no-throw-literal */
/* eslint-disable no-undef */
/* eslint-disable promise/param-names */
/* eslint-disable no-unused-vars */
const { processGetLinksArg, processGetLinksEng, processGetLinksCups } = require('./processRead/processReadLinks')
const { processGetStanding } = require('./processRead/processReadStandings')
const { processGetFixtures } = require('./processRead/processReadFixtures')
const { bgWhite } = require('picocolors')

/* EN LOS GET DATA TAMBIEN PUEDEN OCURRIR ERRORES, ASI QUE CUIDAO */
async function getDataLeague ({ country, season, league, nameData }) {
  let data
  const verificarBody = Object.entries({ country, season, league, nameData })

  /* TODO: FIltrar correctamente esto, guardarlo en un arreglo y enviar mas bonito el error.
    Deberias arreglar todos los errores en general xd
  */
  try {
    verificarBody.forEach(dato => {
      const [propiedad, valor] = dato
      if (!valor) {
        throw {
          message:
          `La propiedad ${propiedad} es ${valor}. Revisa tu body que sea igual a:
            {
              country,
              season,
              league,
              nameData
            }
        `
        }
      }
    })
  } catch (error) {
    return { error }
  }
  try {
    const [{ standings }, { fixtures }] = await Promise.all([processGetStanding(country, season, league, nameData[0]), processGetFixtures(country, season, league, nameData[1])])
    data = [{ standings, fixtures }]
  } catch (err) {
    /* TODO, Verificar si es un error interno de processFunction u otro error. O manejar el error que venga del proccess de otra forma :/ */
    console.error('Retornamos un error intero :/')
    return { error: err }
  }
  return data
}

async function getDataCup ({ country, season, league, nameData }) {
  let data
  const verificarBody = Object.entries({ country, season, league, nameData })
  const verificarData = [...nameData]
  /* TODO: FIltrar correctamente esto, guardarlo en un arreglo y enviar mas bonito el error.
    Deberias arreglar todos los errores en general xd
  */
  try {
    verificarBody.forEach(dato => {
      const [propiedad, valor] = dato

      console.log(valor)

      if (!valor) {
        throw {
          message:
          `La propiedad ${propiedad} es ${valor}. Revisa tu body que sea igual a:
            {
              country,
              season,
              league,
              nameData
            }
        `
        }
      }
    })
    if (verificarData.length !== 2) {
      throw { message: `En la propiedad se esperaba un arreglo con dos elementos para leer las tablas y el fixture. Y solo recibimos ${verificarData.length}` }
    }
  } catch (error) {
    return { error }
  }
  try {
    const [{ standings }, { fixtures }] = await Promise.all([processGetStanding(country, season, league, nameData[0]), processGetFixtures(country, season, league, nameData[1])])
    data = [{ standings, fixtures }]
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
      processGetLinksCups('nations'),
      processGetLinksCups('conmebol'),
      processGetLinksCups('uefa')
    ])
  } catch (err) {
    /* Esto no retorna el error como esperaba, pero aveces funciona xd */
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
