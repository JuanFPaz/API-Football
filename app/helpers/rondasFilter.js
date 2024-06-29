function rondasFilter (unaLiga, unaFases, unosFixtures) {
  console.log(unaLiga)
  switch (unaLiga) {
    case 'Liga Profesional Argentina': {
      return rondasLigaArgentina(unaFases, unosFixtures)
    }
    case 'Copa de la Liga Profesional': {
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
      return rondasUEFAChampions(unaFases, unosFixtures)
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
    case 'CONMEBOL Sudamericana' : {
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
    case 'Euro Championship':{
      return rondasEUROCopa(unaFases, unosFixtures)
    }
    default:{
      const customError = {
        referenceCustomError: 'Hubo un error filtrando las rondas del fixture :('
      }
      throw customError
    }
  }
}

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

function rondasUEFAChampions (...unFixture) {
  const [fases, fixtures] = unFixture
  const regexPrevPhase =
    /\b(1st Qualifying Round|2nd Qualifying Round|3rd Qualifying Round|Play-offs)\b/
  const regexGroupPhase = /Group/
  const regexFinalPhase =
    /\b(Knockout Round Play-offs|Round of 16|Quarter-finals|Semi-finals|Final)\b/
  const fixtureFormateado = fases.map((f) => {
    const fixtureFiltrado = fixtures
      .filter((fx) => fx.league.round === f)
      .map((fx) => {
        const {
          fixture: { id, date, venue, status },
          teams,
          goals,
          score
        } = fx
        return { id, date, venue, status, teams, goals, score }
      })

    return {
      fixtureName: f,
      fixtureLength: fixtureFiltrado.length,
      fixtureMatchs: fixtureFiltrado
    }
  })

  const regexFirstDate = /Group [A-H] - 1/
  const regexSecondDate = /Group [A-H] - 2/
  const regexThirdDate = /Group [A-H] - 3/
  const regexFourDate = /Group [A-H] - 4/
  const regexFiveDate = /Group [A-H] - 5/
  const regexSixDate = /Group [A-H] - 6/

  const primeraFaseFormateada = fixtureFormateado.filter((f) =>
    regexPrevPhase.test(f.fixtureName)
  )
  const segundaFaseFormateada = fixtureFormateado
    .filter((f) => regexGroupPhase.test(f.fixtureName))

  const prueba = [
    {
      fixtureName: 'Group Stage 1',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 2',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 3',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 4',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 5',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 6',
      fixtureLength: 0,
      fixtureMatchs: []
    }
  ]

  /* Fue la mejor forma de juntar los fixtures de la champions (y euro) como los de los demas
      ¿Porque no pueden ser como lalibertadoreeees? (:
  */
  segundaFaseFormateada.filter(f => {
    return regexFirstDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[0].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  segundaFaseFormateada.filter(f => {
    return regexSecondDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[1].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  segundaFaseFormateada.filter(f => {
    return regexThirdDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[2].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  segundaFaseFormateada.filter(f => {
    return regexFourDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[3].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  segundaFaseFormateada.filter(f => {
    return regexFiveDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[4].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  segundaFaseFormateada.filter(f => {
    return regexSixDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[5].fixtureMatchs.push(matchUno, matchDos)
    return f
  })

  prueba[0].fixtureLength = prueba[0].fixtureMatchs.length
  prueba[1].fixtureLength = prueba[1].fixtureMatchs.length
  prueba[2].fixtureLength = prueba[2].fixtureMatchs.length
  prueba[3].fixtureLength = prueba[3].fixtureMatchs.length
  prueba[4].fixtureLength = prueba[4].fixtureMatchs.length
  prueba[5].fixtureLength = prueba[5].fixtureMatchs.length
  // Podemos hacer un map aca y filtrar los regex de la fase de grupo, y guardar los en group stage 1 - 6

  const terceraFaseFormateada = fixtureFormateado.filter((f) =>
    regexFinalPhase.test(f.fixtureName)
  )

  // Ajustar la fase de grupos para tener un fixtureLength de 16 y un fixtureName formateado

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
      phaseLength: prueba.length,
      phaseFixtures: prueba
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

function rondasEUROCopa (...unFixture) {
  const [fases, fixtures] = unFixture

  const regexGroupPhase = /Group/
  const regexFinalPhase = /Round of 16|Quarter-finals|Semi-finals|Final/
  const fixtureFormateado = fases.map((f) => {
    const fixtureFiltrado = fixtures
      .filter((fx) => fx.league.round === f)
      .map((fx) => {
        const {
          fixture: { id, date, venue, status },
          teams,
          goals,
          score
        } = fx
        return { id, date, venue, status, teams, goals, score }
      })

    return {
      fixtureName: f,
      fixtureLength: fixtureFiltrado.length,
      fixtureMatchs: fixtureFiltrado
    }
  })

  const regexFirstDate = /Group [A-H] - 1/
  const regexSecondDate = /Group [A-H] - 2/
  const regexThirdDate = /Group [A-H] - 3/

  const primeraFaseFormateada = fixtureFormateado.filter((f) => regexGroupPhase.test(f.fixtureName))

  const segundaFaseFormateada = fixtureFormateado.filter(f => regexFinalPhase.test(f.fixtureName))

  /* Fue la mejor forma de juntar los fixtures de la champions (y euro) como los de los demas
      ¿Porque no pueden ser como lalibertadoreeees? (:
  */
  const prueba = [
    {
      fixtureName: 'Group Stage 1',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 2',
      fixtureLength: 0,
      fixtureMatchs: []
    },
    {
      fixtureName: 'Group Stage 3',
      fixtureLength: 0,
      fixtureMatchs: []
    }
  ]
  primeraFaseFormateada.filter(f => {
    return regexFirstDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[0].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  primeraFaseFormateada.filter(f => {
    return regexSecondDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[1].fixtureMatchs.push(matchUno, matchDos)
    return f
  })
  primeraFaseFormateada.filter(f => {
    return regexThirdDate.test(f.fixtureName)
  }).forEach(f => {
    const { fixtureMatchs: [matchUno, matchDos] } = f
    prueba[2].fixtureMatchs.push(matchUno, matchDos)
    return f
  })

  prueba[0].fixtureLength = prueba[0].fixtureMatchs.length
  prueba[1].fixtureLength = prueba[1].fixtureMatchs.length
  prueba[2].fixtureLength = prueba[2].fixtureMatchs.length

  // Podemos hacer un map aca y filtrar los regex de la fase de grupo, y guardar los en group stage 1 - 6

  const primeraFase = [
    {
      phaseName: 'Fase de Grupos',
      phaseLength: prueba.length,
      phaseFixtures: prueba
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

module.exports = rondasFilter
