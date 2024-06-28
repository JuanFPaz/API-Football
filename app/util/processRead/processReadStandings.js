const { readFile } = require('node:fs/promises')

async function processGetStanding (pathStanding) {
  let dataStanding
  try {
    if (!pathStanding) {
      return { standings: pathStanding }
    }
    dataStanding = await readFile(pathStanding, 'utf-8')
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error obteniendo los standing antes de enviar la respuesta.',
      process: 'processGetStanding',
      message: err
    }
    throw customError
  }

  try {
    const { response: [{ league: { standings } }] } = JSON.parse(dataStanding)
    const standingsFormateadas = standings.map((standing) => {
      // Parece redundante pero no lo es, cada liga tiene una tabla, por ejemplo la copa de la liga es un arreglo con 2 tablas
      // Seguramente la champions y la libertadores tengan 1 arreglo con 8 tablas
      // y la liga es arreglo con 1 tabla
      // Podria crear un standing.length === 1, evitar hacer el siguiente MAP, pero no veo porque no lo puede hacer
      const standingFormateada = standing.map((equipo) => {
        const { group, team, points, goalsDiff, all, home, away } = equipo
        return {
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

    /* agrego nueva sentencia para reducir los standings en un solo arreglo, y hacer el every: */
    const equipos = standingsFormateadas.reduce((acc, curr) => acc.concat(curr), [])
    const partidosJugados = equipos.every((e) => e.all.played === 0)

    if (partidosJugados) {
      const standingsSorteadas = standingsFormateadas.map((standing) => {
        return standing.sort((a, b) => (a.team.name > b.team.name ? 1 : -1))
      })
      return { standings: standingsSorteadas }
    }

    return { standings: standingsFormateadas }
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
