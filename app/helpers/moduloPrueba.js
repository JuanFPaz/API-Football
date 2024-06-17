const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path')

// (async () => {
//   function rondasUEFAChampions (...unFixture) {
//     const [fases, fixtures] = unFixture
//     const regexPrevPhase =
//       /\b(1st Qualifying Round|2nd Qualifying Round|3rd Qualifying Round|Play-offs)\b/
//     const regexGroupPhase = /Group/
//     const regexFinalPhase =
//       /\b(Knockout Round Play-offs|Round of 16|Quarter-finals|Semi-finals|Final)\b/
//     const fixtureFormateado = fases.map((f) => {
//       const fixtureFiltrado = fixtures
//         .filter((fx) => fx.league.round === f)
//         .map((fx) => {
//           const {
//             fixture: { id, date, venue, status },
//             teams,
//             goals,
//             score
//           } = fx
//           return { id, date, venue, status, teams, goals, score }
//         })

//       return {
//         fixtureName: f,
//         fixtureLength: fixtureFiltrado.length,
//         fixtureMatchs: fixtureFiltrado
//       }
//     })

//     const regexFirstDate = /Group [A-H] - 1/
//     const regexSecondDate = /Group [A-H] - 2/
//     const regexThirdDate = /Group [A-H] - 3/
//     const regexFourDate = /Group [A-H] - 4/
//     const regexFiveDate = /Group [A-H] - 5/
//     const regexSixDate = /Group [A-H] - 6/

//     const primeraFaseFormateada = fixtureFormateado.filter((f) =>
//       regexPrevPhase.test(f.fixtureName)
//     )
//     const segundaFaseFormateada = fixtureFormateado
//       .filter((f) => regexGroupPhase.test(f.fixtureName))

//     const prueba = [
//       {
//         fixtureName: 'Group Stage 1',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       },
//       {
//         fixtureName: 'Group Stage 2',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       },
//       {
//         fixtureName: 'Group Stage 3',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       },
//       {
//         fixtureName: 'Group Stage 4',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       },
//       {
//         fixtureName: 'Group Stage 5',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       },
//       {
//         fixtureName: 'Group Stage 6',
//         fixtureLength: 0,
//         fixtureMatchs: []
//       }
//     ]

//     /* Fue la mejor forma de juntar los fixtures de la champions (y euro) como los de los demas
//         ¿Porque no pueden ser como lalibertadoreeees? (:
//     */
//     segundaFaseFormateada.filter(f => {
//       return regexFirstDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[0].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })
//     segundaFaseFormateada.filter(f => {
//       return regexSecondDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[1].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })
//     segundaFaseFormateada.filter(f => {
//       return regexThirdDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[2].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })
//     segundaFaseFormateada.filter(f => {
//       return regexFourDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[3].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })
//     segundaFaseFormateada.filter(f => {
//       return regexFiveDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[4].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })
//     segundaFaseFormateada.filter(f => {
//       return regexSixDate.test(f.fixtureName)
//     }).forEach(f => {
//       const { fixtureMatchs: [matchUno, matchDos] } = f
//       prueba[5].fixtureMatchs.push(matchUno, matchDos)
//       return f
//     })

//     prueba[0].fixtureLength = prueba[0].fixtureMatchs.length
//     prueba[1].fixtureLength = prueba[1].fixtureMatchs.length
//     prueba[2].fixtureLength = prueba[2].fixtureMatchs.length
//     prueba[3].fixtureLength = prueba[3].fixtureMatchs.length
//     prueba[4].fixtureLength = prueba[4].fixtureMatchs.length
//     prueba[5].fixtureLength = prueba[5].fixtureMatchs.length
//     // Podemos hacer un map aca y filtrar los regex de la fase de grupo, y guardar los en group stage 1 - 6

//     const terceraFaseFormateada = fixtureFormateado.filter((f) =>
//       regexFinalPhase.test(f.fixtureName)
//     )

//     // Ajustar la fase de grupos para tener un fixtureLength de 16 y un fixtureName formateado

//     const primeraFase = [
//       {
//         phaseName: 'Fase Previa/Eliminacion',
//         phaseLength: primeraFaseFormateada.length,
//         phaseFixtures: primeraFaseFormateada
//       }
//     ]

//     const segundaFase = [
//       {
//         phaseName: 'Fase de Grupos',
//         phaseLength: prueba.length,
//         phaseFixtures: prueba
//       }
//     ]

//     const terceraFase = [
//       {
//         phaseName: 'Fase Final',
//         phaseLength: terceraFaseFormateada.length,
//         phaseFixtures: terceraFaseFormateada
//       }
//     ]
//     return [primeraFase, segundaFase, terceraFase]
//   }

//   const DATA_PATH = resolve(__dirname, '../data')

//   const dataPathFixtures = join(
//     DATA_PATH,
//     'uefa',
//     'season',
//     '2023',
//     'uefa-champions-league',
//     'fixtures-uefa-champions-league-2023.json'
//   )
//   const dataPathRoundsFixtures = join(
//     DATA_PATH,
//     'uefa',
//     'season',
//     '2023',
//     'uefa-champions-league',
//     'rounds-fixtures-uefa-champions-league-2023.json'
//   )

//   const dataFileFixtures = await readFile(dataPathFixtures, 'utf-8')
//   const dataFileRoundsFixtures = await readFile(
//     dataPathRoundsFixtures,
//     'utf-8'
//   )

//   const { response: fases } = JSON.parse(dataFileRoundsFixtures)
//   const { response: fixtures } = JSON.parse(dataFileFixtures)

//   console.log(rondasUEFAChampions(fases, fixtures))
// })()
