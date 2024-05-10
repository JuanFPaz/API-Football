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
      fixturesMatchs: fixtureFiltrado
    }
  })
  const primeraFaseFormateada = fixtureFormateado.filter(f => regexNew.test(f.fixtureName))
  const segundaFaseFormateada = fixtureFormateado.filter(f => !regexNew.test(f.fixtureName))

  const primeraFase = [
    {
      phaseName: 'Fase Regular',
      phasesLength: primeraFaseFormateada.length,
      phasesFixtures: primeraFaseFormateada
    }
  ]

  const segundaFase = [
    {
      phaseName: 'Fase Final',
      phasesLength: segundaFaseFormateada.length,
      phasesFixtures: segundaFaseFormateada
    }
  ]
  return [primeraFase, segundaFase]
}

function rondasCopaArgentina (...unFixture) {
  const [fases, fixtures] = unFixture

  const fixtureFormateado = fases.map((f) => {
    const fixtureFiltrado = fixtures.filter(fx => fx.league.round === f).map(fx => {
      const { fixture: { id, date, venue, status }, teams, goals, score } = fx
      return { id, date, venue, status, teams, goals, score }
    })

    return {
      fixtureName: f,
      fixtureLength: fixtureFiltrado.length,
      fixturesMatchs: fixtureFiltrado
    }
  })

  const unicaFase = [
    {
      phaseName: 'Fase Unica/Eliminacion Directa',
      phasesLength: fixtureFormateado.length,
      phasesFixtures: fixtureFormateado
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
      fixturesMatchs: fixtureFiltrado
    }
  })
  const faseRegular = [
    {
      phaseName: 'Fase Regular',
      phasesLength: fixtureFormateado.length,
      phasesFixtures: fixtureFormateado
    }
  ]

  return [faseRegular]
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
      return rondasCopaArgentina(unaFases, unosFixtures)
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
