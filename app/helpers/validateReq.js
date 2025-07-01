const liga = {
  arg: {
    country: 'argentina',
    liga_profesional_argentina: {
      standing: true,
      fixture: true
    },
    copa_de_la_liga_profesional: {
      standing: true,
      fixture: true
    },
    copa_argentina: {
      standing: false,
      fixture: true
    }
  },

  conmebol: {
    country: 'conmebol',
    conmebol_libertadores: {
      standing: true,
      fixture: true
    },
    conmebol_sudamericana: {
      standing: true,
      fixture: true
    },
    conmebol_recopa: {
      standing: false,
      fixture: true
    },
    copa_america: {
      id: 9,
      standing: true,
      fixture: true
    }
  },
  uefa: {
    country: 'uefa',
    euro_championship: {
      id: 4,
      standing: true,
      fixture: true
    },
    uefa_champions_league: {
      standing: true,
      fixture: true
    },
    uefa_europa_league: {
      standing: true,
      fixture: true
    },
    uefa_europa_conference_league: {
      standing: true,
      fixture: true
    },
    uefa_super_cup: {
      standing: false,
      fixture: true
    }
  }
}

module.exports = liga
