const { readFile } = require('node:fs/promises')
const tablasFormater = require('../../helpers/tablasFormater')

async function processGetStanding ({ standing }) {
  let dataStanding
  try {
    if (!standing) {
      return null
    }
    dataStanding = await readFile(standing, 'utf-8')
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error obteniendo los standing antes de enviar la respuesta.',
      process: 'processGetStanding',
      message: err
    }
    throw customError
  }

  try {
    const { response: [{ league: { id, codeLeague, name, season, standings } }] } = JSON.parse(dataStanding)
    const standingsFormateadas = standings.map((standing) => {
      // Parece redundante pero no lo es, cada liga tiene una tabla, por ejemplo la copa de la liga es un arreglo con 2 tablas
      // Seguramente la champions y la libertadores tengan 1 arreglo con 8 tablas
      // y la liga es arreglo con 1 tabla
      // Podria crear un standing.length === 1, evitar hacer el siguiente MAP, pero no veo porque no lo puede hacer
      const standingFormateada = standing.map((equipo) => {
        const { rank, group, team, points, goalsDiff, all, home, away } = equipo
        return {
          rank,
          group,
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

    const respuestafinal = tablasFormater(id, codeLeague, name, season, standingsFormateadas)
    // Esto es viejo, y me lo dejo aca
    // 9/7/2025
    // /* agrego nueva sentencia para reducir los standings en un solo arreglo, y hacer el every: */
    // const equipos = standingsFormateadas.reduce((acc, curr) => acc.concat(curr), [])
    // const partidosJugados = equipos.every((e) => e.all.played === 0)

    // if (partidosJugados) {
    //   const standingsSorteadas = standingsFormateadas.map((standing) => {
    //     return standing.sort((a, b) => (a.team.name > b.team.name ? 1 : -1))
    //   })
    //   return standingsSorteadas
    // }

    return respuestafinal
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error obteniendo los standing antes de enviar la respuesta.',
      process: 'processGetStanding',
      message: err
    }
    throw customError
  }
}
module.exports = {
  processGetStanding
}
