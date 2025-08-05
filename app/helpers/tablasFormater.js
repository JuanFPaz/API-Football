function tablasFormater (unId, unCodeLeague, unLeagueName, unaSeason, unosStandings) {
  switch (unId) {
    case 128:
    {
      return tablaLigaProfesional(unCodeLeague, unaSeason, unLeagueName, unosStandings)
    }
    case 1:
    case 11:
    case 13:
    case 15:
    {
      return tablasCopasConOchoGrupos(unCodeLeague, unLeagueName, unosStandings)
    }
    case 9: {
      const [tabla1, tabla2, tabla3, tabla4] = unosStandings

      return { grupoA: tabla1, grupoB: tabla2, grupoC: tabla3, grupoD: tabla4 }
    }
    default:
      return tablaDeUnaLigaComunYCorrienteComoDeberiaSerEnArgentina(unosStandings)
  }
}

function tablaDeUnaLigaComunYCorrienteComoDeberiaSerEnArgentina (unosStandings) {
  const [unicaTabla] = unosStandings

  return { tablaAnual: unicaTabla }
}

function tablaLigaProfesional (unCodeLeague, unaSeason, unLeagueName, unosStandings) {
  if (unaSeason >= 2025) {
    let [tabla1, tabla2, tabla3, tabla4] = unosStandings
    if (unCodeLeague === 'lpf-clausura') {
      tabla2 = tabla2.sort((a, b) => (a.team.name > b.team.name ? 1 : -1)).map((team, idx) => {
        team.rank = idx + 1

        team.points = 0
        team.goalsDiff = 0
        team.all.played = 0
        team.all.win = 0
        team.all.draw = 0
        team.all.lose = 0
        team.all.goals.for = 0
        team.all.goals.against = 0

        team.home.played = 0
        team.home.win = 0
        team.home.draw = 0
        team.home.lose = 0
        team.home.goals.for = 0
        team.home.goals.against = 0

        team.away.played = 0
        team.away.win = 0
        team.away.draw = 0
        team.away.lose = 0
        team.away.goals.for = 0
        team.away.goals.against = 0

        return team
      })

      tabla3 = tabla3.sort((a, b) => (a.team.name > b.team.name ? 1 : -1)).map((team, idx) => {
        team.rank = idx + 1

        team.points = 0
        team.goalsDiff = 0
        team.all.played = 0
        team.all.win = 0
        team.all.draw = 0
        team.all.lose = 0
        team.all.goals.for = 0
        team.all.goals.against = 0

        team.home.played = 0
        team.home.win = 0
        team.home.draw = 0
        team.home.lose = 0
        team.home.goals.for = 0
        team.home.goals.against = 0

        team.away.played = 0
        team.away.win = 0
        team.away.draw = 0
        team.away.lose = 0
        team.away.goals.for = 0
        team.away.goals.against = 0

        return team
      })
    }

    return { zonaA: tabla2, zonaB: tabla3, tablaAnual: tabla1, tablaPromedios: tabla4 }
  }
}

function tablasCopasConOchoGrupos (unCodeLeague, unLeagueName, unosStandings) {
  const [tabla1, tabla2, tabla3, tabla4, tabla5, tabla6, tabla7, tabla8] = unosStandings

  return { grupoA: tabla1, grupoB: tabla2, grupoC: tabla3, grupoD: tabla4, grupoE: tabla5, grupoF: tabla6, grupoG: tabla7, grupoH: tabla8 }
}

module.exports = tablasFormater
