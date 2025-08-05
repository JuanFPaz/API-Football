const { fasesFilter } = require('./fasesFilter')

function rondasFilter ({ id, fases, fixtures, standings }) {
  switch (id) {
    case 128: {
      return rondasLigaArgentina({ fases, fixtures, standings })
    }
    case 71:
    case 34: {
      // Eliminatorias: 34
      // Brasil: 71
      return rondasLigasClasicas({ fases, fixtures, standings })
    }
    case 130:
    case 541: {
      return rondasCopasNacionales({ fases, fixtures, standings })
    }
    case 11:
    case 13: {
      // Sudamericana: 11
      // Libertadores: 13
      return rondasCopaDeSudamerica({ fases, fixtures, standings })
    }
    case 1:
    case 9:
    case 15:{
      return rondasCopasDeSelecciones({ fases, fixtures, standings })
    }
    default: {
      const customError = {
        referenceCustomError:
          'Hubo un error filtrando las rondas del fixture :('
      }
      throw customError
    }
  }
}

function rondasCopasNacionales ({ fases, fixtures }) {
  const asd = fasesFilter({ fases, fixtures })
  return { faseCopaArgentina: asd }
}

function rondasLigasClasicas ({ fases, fixtures }) {
  const faseRegular = fases.map((fase, indice, sameArray) => {
    const fechaRound = fase.round
    const diasRound = fase.dates
    const matchs = fixtures.filter((fx) => {
      const fixRound = fx.league.round
      if (fixRound === fechaRound) {
        return true
      }
      return false
    }).map(mt => {
      const hora = new Date(mt.fixture.date).getHours()
      const minutos = new Date(mt.fixture.date).getMinutes() < 10 ? `0${new Date(mt.fixture.date).getMinutes()}` : new Date(mt.fixture.date).getMinutes()
      mt.fixture.dateToString = `${hora} : ${minutos} (Hora de Argentina)`

      return mt
    })
    const dias = diasRound.map((dia) => {
      const dateDia = new Date(dia)
      const dd = dateDia.getDate()
      const mm = dateDia.getMonth() + 1
      const yyyy = dateDia.getFullYear()

      const diaFinal = `${dd}-${mm}-${yyyy}`
      return diaFinal
    })
    // const fixture = diasRound.map((d) => {
    //   const dateDia = new Date(d)
    //   const partidosFiltradoxDia = matchs.filter((mt) => {
    //     const dateFixtureMatch = new Date(mt.fixture.date)
    //     const diasIguales =
    //         dateDia.getUTCDate() === dateFixtureMatch.getDate()
    //     const mesesIguales =
    //         dateDia.getUTCMonth() === dateFixtureMatch.getMonth()
    //     const añosIguales =
    //         dateDia.getUTCFullYear() === dateFixtureMatch.getFullYear()

    //     if (diasIguales && mesesIguales && añosIguales) {
    //       return true
    //     }

    //     if (mt.fixture.status.short === 'TBD') {
    //       return true
    //     }
    //     return false
    //   })
    //   return { dia: d, partidos: partidosFiltradoxDia }
    // }).filter((fx) => fx.partidos.length > 0)

    const current = () => {
      const diaDeHoy = new Date()
      const diaUno = new Date(diasRound[0])
      const diaDos = new Date(diasRound[diasRound.length - 1])
      const __fases = sameArray

      const estamosUltimaFechaRegular = () => {
        return (indice + 1 > __fases.length - 1) && (estamosEntreLosDias() || estamosEntreFechas())
      }

      const estamosEntreLosDias = () => {
        return (diaDeHoy.getTime() >= diaUno.getTime() - 86400000 && diaDeHoy <= diaDos.getTime()) && !hayPartidoPostergado()
      }

      const estamosEntreFechas = () => {
        try {
          const diasFechaSiguiente = __fases[indice + 1].dates
          const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
          return (diaDeHoy.getTime() >= diaDos.getTime() && diaDeHoy.getTime() <= diaUnoFechaSiguiente.getTime() - 86400000)
        } catch (error) {
          return false
        }
      }

      const hayPartidoPostergado = () => {
        try {
          const diasFechaSiguiente = __fases[indice + 1].dates
          const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
          return diaDos.getTime() > diaUnoFechaSiguiente.getTime()
        } catch (error) {
          return false
        }
      }
      if (estamosUltimaFechaRegular()) return true
      if (estamosEntreLosDias()) return true
      if (estamosEntreFechas()) return true

      return false
    }
    return { fecha: fase.round, current: current(), dias, fixture: matchs }
  })

  const chequeandoFaseRegular = () => faseRegular.every((e) => e.current === false)

  if (chequeandoFaseRegular()) {
    faseRegular[faseRegular.length - 1].current = true
  }

  return { faseRegular }
}

function rondasLigaArgentina ({ fases, fixtures }) {
  const season = fixtures[0].league.season

  if (season === 2025) {
    // Apertura y Clausura 2025
    const asd = fases.map((fase, indice, sameArray) => {
      const fechaRound = fase.round
      const diasRound = fase.dates
      const matchs = fixtures.filter((fx) => {
        const fixRound = fx.league.round
        if (fixRound === fechaRound) {
          return true
        }
        return false
      }).map(mt => {
        const hora = new Date(mt.fixture.date).getHours()
        const minutos = new Date(mt.fixture.date).getMinutes() < 10 ? `0${new Date(mt.fixture.date).getMinutes()}` : new Date(mt.fixture.date).getMinutes()
        mt.fixture.dateToString = `${hora} : ${minutos}`

        return mt
      })

      const dias = diasRound.map((dia) => {
        const dateDia = new Date(dia)
        const dd = dateDia.getDate()
        const mm = dateDia.getMonth() + 1
        const yyyy = dateDia.getFullYear()

        const diaFinal = `${dd}-${mm}-${yyyy}`
        return diaFinal
      })

      // const fixture = diasRound.map((d, idx) => {
      //   const dateDia = new Date(d)
      //   const partidosFiltradoxDia = matchs.filter((mt) => {
      //     const dateFixtureMatch = new Date(mt.fixture.date)
      //     const diasIguales =
      //         dateDia.getUTCDate() === dateFixtureMatch.getDate()
      //     const mesesIguales =
      //         dateDia.getUTCMonth() === dateFixtureMatch.getMonth()
      //     const añosIguales =
      //         dateDia.getUTCFullYear() === dateFixtureMatch.getFullYear()

      //     if (diasIguales && mesesIguales && añosIguales) {
      //       return true
      //     }

      //     if (mt.fixture.status.short === 'TBD') {
      //       return true
      //     }
      //     return false
      //   })
      //   return { dia: dias[idx], partidos: partidosFiltradoxDia }
      // }).filter((fx) => fx.partidos.length > 0)

      const current = () => {
        const diaDeHoy = new Date()
        const diaUno = new Date(diasRound[0])
        const diaDos = new Date(diasRound[diasRound.length - 1])

        const __fases = sameArray

        const estamosEntreLosDias = () => {
          return (diaDeHoy.getTime() >= diaUno.getTime() - 86400000 && diaDeHoy <= diaDos.getTime()) && !hayPartidoPostergado()
        }

        const estamosEntreFechas = () => {
          try {
            const diasFechaSiguiente = __fases[indice + 1].dates
            const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
            return (diaDeHoy.getTime() >= diaDos.getTime() && diaDeHoy.getTime() <= diaUnoFechaSiguiente.getTime() - 86400000)
          } catch (error) {
            return false
          }
        }

        const hayPartidoPostergado = () => {
          try {
            const diasFechaSiguiente = __fases[indice + 1].dates
            const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
            return diaDos.getTime() > diaUnoFechaSiguiente.getTime()
          } catch (error) {
            const diasFechaSiguiente = __fases[indice].dates
            const diaUnoFechaSiguiente = new Date(diasFechaSiguiente[0])
            return diaDos.getTime() > diaUnoFechaSiguiente.getTime()
          }
        }
        if (estamosEntreLosDias()) return true
        if (estamosEntreFechas()) return true

        return false
      }
      return { fecha: fase.round, current: current(), dias, fixture: matchs }
    })
    const regexFaseRegular = /^(1st|2nd) Phase - (?:[1-9]|1[0-6])$/i
    const regexFaseFinal = /^(1st|2nd) Phase - (?:8th Finals|Quarter[- ]?finals|Semi[- ]?finals|Final)$/i
    const faseRegular = asd.filter((fases) => regexFaseRegular.test(fases.fecha))
    const faseFinal = asd.filter((fases) => regexFaseFinal.test(fases.fecha))

    const chequeandoFaseRegular = () => faseRegular.every((e) => e.current === false)

    if (chequeandoFaseRegular()) {
      faseRegular[faseRegular.length - 1].current = true
    }

    return { faseRegular, faseFinal }
  }
}
function rondasCopaDeSudamerica ({ fases, fixtures, standings }) {
  // Primero leemos la tabla
  const asd = fasesFilter({ fases, fixtures, standings })

  const regexFasePreliminar = /^\d+(st|nd|rd|th) Round$/i
  const regexFaseGrupo = /^Group Stage - [1-6]$/i
  const regexFaseFinal = /^(Round\s*of\s*16|Quarter[- ]?finals|Semi[- ]?finals|Final)$/i
  const fasePremilinar = asd.filter((fases) => regexFasePreliminar.test(fases.fecha))
  const faseGrupos = asd.filter((fases) => regexFaseGrupo.test(fases.fecha))
  const faseFinal = asd.filter((fases) => regexFaseFinal.test(fases.fecha))

  const grupoName = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
  const nuevaFaseGrupos = standings.map((standing, idx) => {
  // COMENZAMOS EL RECORRIDO EN EL PRIMER INDICE DE FASE DE GRUPOS:
  // cada tabla : standings[0]
  // cada equipo: standings[0][0]
    const equipoA = standing[0].team
    const equipoB = standing[1].team
    const equipoC = standing[2].team
    const equipoD = standing[3].team
    //   const fixtureFiltrado = faseGrupos[0].fixture.filter(({ teams: { home, away } }) => (home.id === equipoA.id || home.id === equipoB.id || away.id === equipoA.id || away.id === equipoB.id))
    const grupo = faseGrupos.map(unaFecha => {
      const fixtureFiltrado = unaFecha.fixture.filter(fixture => {
        const { teams: { home, away } } = fixture

        if (home.id === equipoA.id || away.id === equipoA.id || home.id === equipoC.id || away.id === equipoC.id) return true
        if (home.id === equipoB.id || away.id === equipoB.id || home.id === equipoD.id || away.id === equipoD.id) return true

        return false
      })
      return { fecha: `${unaFecha.fecha} - ${grupoName[idx]}`, dias: unaFecha.dias, fixture: fixtureFiltrado }
    })
    return grupo.reverse()
  })
  console.log('Listo')

  return { fasePremilinar, faseGrupos: nuevaFaseGrupos, faseFinal }
}

function rondasCopasDeSelecciones ({ fases, fixtures, standings }) {
  // Primero leemos la tabla
  const asd = fasesFilter({ fases, fixtures, standings })

  const regexFaseGrupo = /^Group Stage - [1-3]$/i
  const regexFaseFinal = /^(Round\s*of\s*16|Quarter[- ]?finals|Semi[- ]?finals|Final)$/i
  const faseGrupos = asd.filter((fases) => regexFaseGrupo.test(fases.fecha))
  const faseFinal = asd.filter((fases) => regexFaseFinal.test(fases.fecha))

  const grupoName = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
  const nuevaFaseGrupos = standings.map((standing, idx) => {
  // COMENZAMOS EL RECORRIDO EN EL PRIMER INDICE DE FASE DE GRUPOS:
  // cada tabla : standings[0]
  // cada equipo: standings[0][0]
    const equipoA = standing[0].team
    const equipoB = standing[1].team
    const equipoC = standing[2].team
    const equipoD = standing[3].team
    //   const fixtureFiltrado = faseGrupos[0].fixture.filter(({ teams: { home, away } }) => (home.id === equipoA.id || home.id === equipoB.id || away.id === equipoA.id || away.id === equipoB.id))
    const grupo = faseGrupos.map(unaFecha => {
      const fixtureFiltrado = unaFecha.fixture.filter(fixture => {
        const { teams: { home, away } } = fixture

        if (home.id === equipoA.id || away.id === equipoA.id || home.id === equipoC.id || away.id === equipoC.id) return true
        if (home.id === equipoB.id || away.id === equipoB.id || home.id === equipoD.id || away.id === equipoD.id) return true

        return false
      })

      return { fecha: `${unaFecha.fecha} - ${grupoName[idx]}`, dias: unaFecha.dias, fixture: fixtureFiltrado }
    })
    return grupo.reverse()
  })
  console.log('Listo')

  return { faseGrupos: nuevaFaseGrupos, faseFinal }
}

module.exports = rondasFilter
