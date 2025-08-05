/* eslint-disable no-undef */
const { readFile, writeFile } = require('node:fs/promises')
const { resolve } = require('node:path')

const DATA_RUTA = resolve(__dirname, '../../probando los arreglos de dias.json')

console.log(DATA_RUTA)

const PATHS = {
  standing: 'C:\\Users\\Fonko\\Documents\\Desarrollo\\repositorios-locales\\nodejs\\API-Football\\app\\data\\arg\\2025\\lpf-clausura\\standings-lpf-clausura-2025.json',
  fixture: 'C:\\Users\\Fonko\\Documents\\Desarrollo\\repositorios-locales\\nodejs\\API-Football\\app\\data\\arg\\2025\\lpf-clausura\\fixtures-lpf-clausura-2025.json',
  rounds: 'C:\\Users\\Fonko\\Documents\\Desarrollo\\repositorios-locales\\nodejs\\API-Football\\app\\data\\arg\\2025\\lpf-clausura\\rounds-fixtures-lpf-clausura-2025.json'
}

// Simular sumatoria de puntos
async function main ({ fixture, standing }) {
  let dataFixtures
  let dataStanding
  try {
    dataFixtures = await readFile(fixture, 'utf-8')
    dataStanding = await readFile(standing, 'utf-8')
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error obteniendo los fixtures antes de enviar la respuesta.',
      process: 'proccessGetFixtures',
      message: err
    }
    throw customError
  }

  try {
    const { response: fixtures } = JSON.parse(dataFixtures)
    const id = fixtures[0].league.id
    const { response: [{ league: { standings } }] } = JSON.parse(dataStanding)
    const dataFormatear = { id, fixtures, standings }

    const fixturesFormateados = sumarPuntos(dataFormatear)

    await writeFile(DATA_RUTA, JSON.stringify(fixturesFormateados))
  } catch (err) {
    console.log(err)

    const customError = {
      reference: 'Ocurrio un error formateando la respuesta final.',
      process: 'proccessGetFixtures',
      message: err
    }
    throw customError
  }
}

function sumarPuntos ({ fixtures, standings }) {
  const [zonaA, zonaB, tablaAnual] = standings
  const partidosJugados = fixtures.filter((fx) => {
    if (fx.fixture.status.short === 'FT') return true
    return false
  }).map(pj => {
    const { long, short } = pj.fixture.status
    const { round } = pj.league
    const { teams, goals, score } = pj

    return { round, long, short, teams, goals, score }
  })

  const sumatoria = partidosJugados.map((pj) => {
    if (pj.team.home.winner === null && pj.team.away.winner === null) {
      pj.team.home.points = 1
      pj.team.home.played = 1
      pj.team.home.win = 0
      pj.team.home.draw = 0
    }
  })
  return { partidosJugados }
}

// function rondasLibertadores ({ fases, fixtures, standings }) {
//   // Primero leemos la tabla
//   const asd = fases.map((fase) => {
//     const fechaRound = fase.round
//     const diasRound = fase.dates
//     const matchs = fixtures.filter((fx) => {
//       const fixRound = fx.league.round
//       if (fixRound === fechaRound) {
//         return true
//       }
//       return false
//     })

//     return { fecha: fase.round, dias: diasRound, fixture: matchs }
//   })

//   const regexFasePreliminar = /^\d+(st|nd|rd|th) Round$/i
//   const regexFaseGrupo = /^Group Stage - [1-6]$/i
//   const regexFaseFinal = /^(Round\s*of\s*16|Quarter[- ]?finals|Semi[- ]?finals|Final)$/i
//   const fasePremilinar = asd.filter((fases) => regexFasePreliminar.test(fases.fecha))
//   const faseGrupos = asd.filter((fases) => regexFaseGrupo.test(fases.fecha))
//   const faseFinal = asd.filter((fases) => regexFaseFinal.test(fases.fecha))

//   const grupoName = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
//   const nuevaFaseGrupos = standings.map((standing, idx) => {
//   // COMENZAMOS EL RECORRIDO EN EL PRIMER INDICE DE FASE DE GRUPOS:
//   // cada tabla : standings[0]
//   // cada equipo: standings[0][0]
//     const equipoA = standing[0].team
//     const equipoB = standing[1].team

//     //   const fixtureFiltrado = faseGrupos[0].fixture.filter(({ teams: { home, away } }) => (home.id === equipoA.id || home.id === equipoB.id || away.id === equipoA.id || away.id === equipoB.id))
//     const grupo = faseGrupos.map(unaFecha => {
//       const fixtureFiltrado = unaFecha.fixture.filter(fixture => {
//         const { teams: { home, away } } = fixture

//         if (home.id === equipoA.id || away.id === equipoA.id) return true
//         if (home.id === equipoB.id || away.id === equipoB.id) return true

//         return false
//       })
//       return { fecha: `${unaFecha.fecha} - ${grupoName[idx]}`, dias: unaFecha.dias, fixture: fixtureFiltrado }
//     })
//     return grupo
//   })
//   console.log('Listo')

//   return { fasePremilinar, faseGrupos: nuevaFaseGrupos, faseFinal }
// }
// function rondasLigaArgentina ({ fases, fixtures }) {
//   const season = fixtures[0].league.season

//   if (season === 2025) {
//     // Apertura y Clausura 2025
//     const asd = fases.map((fase, indice, sameArray) => {
//       const fechaRound = fase.round
//       const diasRound = fase.dates
//       const matchs = fixtures.filter((fx) => {
//         const fixRound = fx.league.round
//         if (fixRound === fechaRound) {
//           return true
//         }
//         return false
//       }).map(mt => {
//         const hora = new Date(mt.fixture.date).getHours()
//         const minutos = new Date(mt.fixture.date).getMinutes() < 10 ? `0${new Date(mt.fixture.date).getMinutes()}` : new Date(mt.fixture.date).getMinutes()
//         mt.fixture.dateToString = `${hora} : ${minutos}`

//         return mt
//       })

//       const fixture = diasRound.map((d, idx) => {
//         const dateDia = new Date(d)
//         const partidosFiltradoxDia = matchs.filter((mt, idx, array) => {
//           const dateFixtureMatch = new Date(mt.fixture.date)

//           const diasIguales =
//               dateDia.getUTCDate() === dateFixtureMatch.getDate()
//           const mesesIguales =
//               dateDia.getUTCMonth() === dateFixtureMatch.getMonth()
//           const añosIguales =
//               dateDia.getUTCFullYear() === dateFixtureMatch.getFullYear()
//           if (diasIguales && mesesIguales && añosIguales) {
//             return true
//           }

//           if (mt.fixture.status.short === 'TBD') {
//             return true
//           }
//           return false
//         })
//         return partidosFiltradoxDia
//       })
//       // const dias = diasRound.map((dia) => {
//       //   const dateDia = new Date(dia)
//       //   const dd = dateDia.getUTCDate()
//       //   const mm = dateDia.getUTCMonth() + 1
//       //   const yyyy = dateDia.getUTCFullYear()

//       //   const diaFinal = `${dd}-${mm}-${yyyy}`
//       //   return diaFinal
//       // })

//       // const fixture = diasRound.map((d, idx) => {
//       //   const dateDia = new Date(d)
//       //   const partidosFiltradoxDia = matchs.filter((mt, idx, array) => {
//       //     const dateFixtureMatch = new Date(mt.fixture.date)

//       //     const diasIguales =
//       //         dateDia.getUTCDate() === dateFixtureMatch.getDate()
//       //     const mesesIguales =
//       //         dateDia.getUTCMonth() === dateFixtureMatch.getMonth()
//       //     const añosIguales =
//       //         dateDia.getUTCFullYear() === dateFixtureMatch.getFullYear()

//       //     if (diasIguales && mesesIguales && añosIguales) {
//       //       return true
//       //     }

//       //     if (mt.fixture.status.short === 'TBD') {
//       //       return true
//       //     }
//       //     return false
//       //   })
//       //   return partidosFiltradoxDia
//       // }).filter((fx) => fx.length > 0)

//       const current = () => {
//         const diaDeHoy = new Date()
//         const diaUno = new Date(diasRound[0])
//         const diaDos = new Date(diasRound[diasRound.length - 1])

//         const __fases = sameArray

//         const estamosEntreLosDias = () => {
//           return (diaDeHoy.getTime() >= diaUno.getTime() - 86400000 && diaDeHoy <= diaDos.getTime()) && !hayPartidoPostergado()
//         }

//         const estamosEntreFechas = () => {
//           try {
//             const diasFechaSiguiente = __fases[indice + 1].dates
//             const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
//             return (diaDeHoy.getTime() >= diaDos.getTime() && diaDeHoy.getTime() <= diaUnoFechaSiguiente.getTime() - 86400000)
//           } catch (error) {
//             return false
//           }
//         }

//         const hayPartidoPostergado = () => {
//           try {
//             const diasFechaSiguiente = __fases[indice + 1].dates
//             const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
//             return diaDos.getTime() > diaUnoFechaSiguiente.getTime()
//           } catch (error) {
//             const diasFechaSiguiente = __fases[indice].dates
//             const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
//             return diaDos.getTime() > diaUnoFechaSiguiente.getTime()
//           }
//         }
//         if (estamosEntreLosDias()) return true
//         if (estamosEntreFechas()) return true

//         return false
//       }
//       return { fecha: fase.round, current: current(), dias: diasRound, fixture }
//     })
//     const regexFaseRegular = /^(1st|2nd) Phase - (?:[1-9]|1[0-6])$/i
//     const regexFaseFinal = /^(1st|2nd) Phase - (?:8th Finals|Quarter[- ]?finals|Semi[- ]?finals|Final)$/i
//     const faseRegular = asd.filter((fases) => regexFaseRegular.test(fases.fecha))
//     const faseFinal = asd.filter((fases) => regexFaseFinal.test(fases.fecha))

//     const chequeandoFaseRegular = () => faseRegular.every((e) => e.current === false)

//     if (chequeandoFaseRegular()) {
//       faseRegular[faseRegular.length - 1].current = true
//     }

//     return { faseRegular, faseFinal }
//   }
// }
main(PATHS)
