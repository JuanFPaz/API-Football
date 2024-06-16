const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path');

(async () => {
  function rondasUEFA (...unFixture) {
    const [fases, fixtures] = unFixture
    const regexPrevPhase = /\b(1st Qualifying Round|2nd Qualifying Round|3rd Qualifying Round|Play-offs)\b/
    const regexGroupPhase = /Group Stage - /
    const regexFinalPhase = /\b(Knockout Round Play-offs|Round of 16|Quarter-finals|Semi-finals|Final)\b/
    const fixtureFormateado = fases.map((f) => {
      const fixtureFiltrado = fixtures.filter(fx => fx.league.round === f).map(fx => {
        const { fixture: { id, date, venue, status }, teams, goals, score } = fx
        return { id, date, venue, status, teams, goals, score }
      })

      return {
        fixtureName: f,
        fixtureLength: fixtureFiltrado.length,
        fixtureMatchs: fixtureFiltrado
      }
    })

    const primeraFaseFormateada = fixtureFormateado.filter(f => regexPrevPhase.test(f.fixtureName))
    const segundaFaseFormateada = fixtureFormateado.filter(f => regexGroupPhase.test(f.fixtureName))
    const terceraFaseFormateada = fixtureFormateado.filter(f => regexFinalPhase.test(f.fixtureName))

    const primeraFase = [
      {
        phaseName: 'Fase Previa/Eliminacion',
        phaseLength: primeraFaseFormateada.length,
        phaseFixtures: primeraFaseFormateada
      }
    ]

    const segundaFase = [
      {
        phaseName: 'Fase de Grupos',
        phaseLength: segundaFaseFormateada.length,
        phaseFixtures: segundaFaseFormateada
      }
    ]

    const terceraFase = [
      {
        phaseName: 'Fase Final',
        phaseLength: terceraFaseFormateada.length,
        phaseFixtures: terceraFaseFormateada
      }
    ]
    return [primeraFase, segundaFase, terceraFase]
  }

  const DATA_PATH = resolve(__dirname, '../data')

  const dataPathFixtures = join(DATA_PATH, 'nations', 'season', '2024', 'copa-america', 'fixtures-copa-america-2024.json')
  const dataPathRoundsFixtures = join(DATA_PATH, 'nations', 'season', '2024', 'copa-america', 'rounds-fixtures-copa-america-2024.json')

  const dataFileFixtures = await readFile(dataPathFixtures, 'utf-8')
  const dataFileRoundsFixtures = await readFile(dataPathRoundsFixtures, 'utf-8')

  const { response: fases } = JSON.parse(dataFileRoundsFixtures)
  const { response: fixtures } = JSON.parse(dataFileFixtures)

  console.log(fases)

  console.log(rondasCopaAmerica(fases, fixtures))
})()
