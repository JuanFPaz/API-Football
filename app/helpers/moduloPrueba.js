const { readFile } = require('node:fs/promises')
const { resolve, join } = require('node:path');

(async () => {
  function rondasCopaAmerica (...unFixture) {
    /** Por ahora obtenemos solo fase de grupos - Obtener datos de viejas copas americas y terminar de escribir rondasCopaAmerica */
    const [fases, fixtures] = unFixture
    console.log(fases)
    const regexGroupPhase = /Group Stage - [1-3]/

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

    const primeraFaseFormateada = fixtureFormateado.filter(f => regexGroupPhase.test(f.fixtureName))

    const primeraFase = [
      {
        phaseName: 'Fase de Grupos',
        phasesLength: primeraFaseFormateada.length,
        phaseFixtures: primeraFaseFormateada
      }
    ]

    return [primeraFase]
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
