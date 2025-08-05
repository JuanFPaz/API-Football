function fasesFilter ({ fases, fixtures, standings }) {
  return fases.map((fase) => {
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

    return { fecha: fase.round, dias: diasRound, fixture: matchs }
  })
}

module.exports = { fasesFilter }
