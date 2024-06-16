function rondasCopaDeLaLiga (...unFixture) {
  const [fases, fixtures] = unFixture
  const regex = /^1st Phase - (?:[1-9]|1[0-4])$/
  const regexNew = /^Fecha (?:[1-9]|1[0-4])$/

  const fixtureFormateado = fases.map((f, indice) => {
    const fixtureFiltrado = fixtures.filter(fx => fx.league.round === f).map(fx => {
      const { fixture: { id, date, venue, status }, teams, goals, score } = fx
      return { id, date, venue, status, teams, goals, score }
    })
    return {
      fixtureName: regex.test(f) ? `Fecha ${indice + 1}` : f,
      fixtureLength: fixtureFiltrado.length,
      fixtureMatchs: fixtureFiltrado
    }
  })

  const primeraFaseFormateada = fixtureFormateado.filter(f => regexNew.test(f.fixtureName))
  const segundaFaseFormateada = fixtureFormateado.filter(f => !regexNew.test(f.fixtureName))

  const primeraFase = [
    {
      phaseName: 'Fase Regular',
      phaseLength: primeraFaseFormateada.length,
      phaseFixtures: primeraFaseFormateada
    }
  ]

  const segundaFase = [
    {
      phaseName: 'Fase Final',
      phaseLength: segundaFaseFormateada.length,
      phaseFixtures: segundaFaseFormateada
    }
  ]
  return [primeraFase, segundaFase]
}

function rondasCopasNacionales (...unFixture) {
  const [fases, fixtures] = unFixture

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

  const unicaFase = [
    {
      phaseName: 'Fase Unica/Eliminacion Directa',
      phaseLength: fixtureFormateado.length,
      phaseFixtures: fixtureFormateado
    }
  ]

  return [unicaFase]
}

function rondasLigaArgentina (...unFixture) {
  const [fases, fixtures] = unFixture

  const fixtureFormateado = fases.map((f, indice) => {
    const fixtureFiltrado = fixtures.filter(fx => fx.league.round === f).map(fx => {
      const { fixture: { id, date, venue, status }, teams, goals, score } = fx
      return { id, date, venue, status, teams, goals, score }
    })

    return {
      fixtureName: `Fecha ${indice + 1}`,
      fixtureLength: fixtureFiltrado.length,
      fixtureMatchs: fixtureFiltrado
    }
  })

  const faseRegular = [
    {
      phaseName: 'Fase Regular',
      phaseLength: fixtureFormateado.length,
      phaseFixtures: fixtureFormateado
    }
  ]

  return [faseRegular]
}

function rondasChampionsLeague (...unFixture) {
  const [fases, fixtures] = unFixture
  const regexPrevPhase = /\b(Preliminary Round|1st Qualifying Round|2nd Qualifying Round|3rd Qualifying Round|Play-offs)\b/
  const regexGroupPhase = /Group [A-H] - [1-6]/
  const regexFinalPhase = /\b(Round of 16|Quarter-finals|Semi-finals|Final)\b/
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

function rondasCopaAmerica (...unFixture) {
  const [fases, fixtures] = unFixture
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

function rondasCONMEBOL (...unFixture) {
  const [fases, fixtures] = unFixture
  const regexPrevPhase = /\b(1st Round|2nd Round|3rd Round)\b/
  const regexGroupPhase = /Group Stage - [1-6]/
  const regexFinalPhase = /\b(Round of 32|Round of 16|Quarter-finals|Semi-finals|Final)\b/

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
      phasesLength: primeraFaseFormateada.length,
      phaseFixtures: primeraFaseFormateada
    }
  ]

  const segundaFase = [
    {
      phaseName: 'Fase de Grupos',
      phasesLength: segundaFaseFormateada.length,
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

function rondasFinalesUnicas (...unFixture) {
  const [fases, fixtures] = unFixture

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

  const unicaFase = [
    {
      phaseName: 'Final Unica',
      phaseLength: fixtureFormateado.length,
      phaseFixtures: fixtureFormateado
    }
  ]

  return [unicaFase]
}

function rondasFilter (unaLiga, unaFases, unosFixtures) {
  switch (unaLiga) {
    case 'Liga Profesional Argentina': {
      return rondasLigaArgentina(unaFases, unosFixtures)
    }
    case 'Copa de la liga Profesional': {
      return rondasCopaDeLaLiga(unaFases, unosFixtures)
    }
    case 'Copa Argentina' : {
      return rondasCopasNacionales(unaFases, unosFixtures)
    }
    case 'Premier League': {
      return rondasLigaArgentina(unaFases, unosFixtures)
    }
    case 'FA Cup':{
      return rondasCopasNacionales(unaFases, unosFixtures)
    }
    case 'UEFA Champions League' : {
      return rondasChampionsLeague(unaFases, unosFixtures)
    }
    case 'UEFA Europa League' : {
      return rondasUEFA(unaFases, unosFixtures)
    }
    case 'UEFA Europa Conference League' : {
      return rondasUEFA(unaFases, unosFixtures)
    }
    case 'CONMEBOL Libertadores' : {
      return rondasCONMEBOL(unaFases, unosFixtures)
    }
    case 'CONMEBOL sudamericana' : {
      return rondasCONMEBOL(unaFases, unosFixtures)
    }
    case 'CONMEBOL Recopa' : {
      return rondasFinalesUnicas(unaFases, unosFixtures)
    }
    case 'UEFA Super Cup' : {
      return rondasFinalesUnicas(unaFases, unosFixtures)
    }
    case 'Copa America':{
      return rondasCopaAmerica(unaFases, unosFixtures)
    }
    default:{
      const customError = {
        referenceCustomError: 'Hubo un error filtrando las rondas del fixture :('
      }
      throw customError
    }
  }
}

module.exports = rondasFilter
