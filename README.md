# API Football

Proyecto desarrollado con `Nodejs` y `Express`. Es una API que obtiene de su homonima [API Football](https://www.api-football.com/documentation-v3), los datos de diferentes ligas y copas, las tablas de posiciones, fixtures, datos de jugadores, ettc. Tambien tenemos `endpoints` que se encargan del proceso de estos datos, para formatearlos y enviarlos al frontend ([React Footballito](https://github.com/JuanFPaz/react-footballito)) y ser más facil de manipual.

## Enlaces

- Repositorio `React Footballito`: [github.com/JuanFPaz/react-footballito](https://github.com/JuanFPaz/react-footballito)

- Repositorio `API Football`: [github.com/JuanFPaz/API-Football](https://github.com/JuanFPaz/API-Football)

## Version de Node

**_Se recomienda tener instalada la ultima version LTS (20.xx.xx)_**

```json
  "engines" : {
    "node" : ">=18.0.0 <21.00.00"
  }
```

## Configuracion

Crear un directorio nuevo, dond etengamos los repositorios clonados y poder trabajar con estos durante el desarrollo:

```
dir_ejemplo
|
|___
    |---React-footballito (clonado)
    |
    |---API-Football (clonado)
```

### Instalacion

`git clone https://github.com/JuanFPaz/API-Football`

`cd API-football`

`npm install`

`npm run dev`

## Info

- Documentacion API: [API Football - Documentacion (V3)](https://www.api-football.com/documentation-v3)
- Dashboard API: [Dashboard API Football](https://dashboard.api-football.com/)

### Descripcion endpoints de la API original (todavia no hice ningun endpoint xd)

| Endpoint                                  | Descripción                                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `/countries`                              | Nos devuelve los países disponibles, con claves y valores para los Query Search.                                         |
| `/leagues?country=Argentina`              | Nos devuelve todas las ligas, copas de liga y copas nacionales disponibles por paises.                                   |
| `/standings?league=128&season=2024`       | Nos devuelve las tablas de posiciones por liga, copa de liga y temporada.                                                |
| `/fixtures?league=128&season=2024`        | Nos devuelve los fixture completos de ligas, copas de liga y copa nacional/internacional.                                |
| `/fixtures/rounds?league=130&season=2024` | Nos devuelve el fixture de una liga, copas de liga y copa nacional/internacional por rondas.                             |
| `/fixtures/statistics?fixture=1158464`    | Nos devuelve las estadisticas de los equipos en un partido especifico, utilizando la ID del fixture.                     |
| `/fixtures/events?fixture=1158464`        | Nos devuelve los eventos de un partido especifico, como los goles, tarjetas, penales, etc, utilizando la ID del fixture. |

## Estados Disponibles de /fixtures

| SHORT | LONG                          | TYPE       | DESCRIPTION                                                                                                                                           |
| ----- | ----------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| TBD   | Time To Be Defined            | Scheduled  | Scheduled but date and time are not known                                                                                                             |
| NS    | Not Started                   | Scheduled  |                                                                                                                                                       |
| 1H    | First Half, Kick Off          | In Play    | First half in play                                                                                                                                    |
| HT    | Halftime                      | In Play    | Finished in the regular time                                                                                                                          |
| 2H    | Second Half, 2nd Half Started | In Play    | Second half in play                                                                                                                                   |
| ET    | Extra Time                    | In Play    | Extra time in play                                                                                                                                    |
| BT    | Break Time                    | In Play    | Break during extra time                                                                                                                               |
| P     | Penalty In Progress           | In Play    | Penalty played after extra time                                                                                                                       |
| SUSP  | Match Suspended               | In Play    | Suspended by referee's decision, may be rescheduled another day                                                                                       |
| INT   | Match Interrupted             | In Play    | Interrupted by referee's decision, should resume in a few minutes                                                                                     |
| FT    | Match Finished                | Finished   | Finished in the regular time                                                                                                                          |
| AET   | Match Finished                | Finished   | Finished after extra time without going to the penalty shootout                                                                                       |
| PEN   | Match Finished                | Finished   | Finished after the penalty shootout                                                                                                                   |
| PST   | Match Postponed               | Postponed  | Postponed to another day, once the new date and time is known the status will change to Not Started                                                   |
| CANC  | Match Cancelled               | Cancelled  | Cancelled, match will not be played                                                                                                                   |
| ABD   | Match Abandoned               | Abandoned  | Abandoned for various reasons (Bad Weather, Safety, Floodlights, Playing Staff Or Referees), Can be rescheduled or not, it depends on the competition |
| AWD   | Technical Loss                | Not Played |                                                                                                                                                       |
| WO    | WalkOver                      | Not Played | Victory by forfeit or absence of competitor                                                                                                           |
| LIVE  | In Progress                   | In Play    | Used in very rare cases. It indicates a fixture in progress but the data indicating the half-time or elapsed time are not available                   |

### Eventos Disponibles de /fixtures/events

| TYPE  |                |          |                   |                |
| ----- | -------------- | -------- | ----------------- | -------------- |
| Goal  | Normal Goal    | Own Goal | Penalty           | Missed Penalty |
| Card  | Yellow Card    | Red Card |                   |                |
| Subst | Substitution   |          |                   |                |
| Var   | Goal Cancelled |          | Penalty Confirmed |                |

## Paises, ligas y copas a obtener

### Argentina

- Liga Profesional
  - `league_id`: 128
  - `current-season`: 2024
- Copa de Liga Profesional
  - `league_id`: 1032
  - `current-season`:2024
- Copa Argentina
  - `league_id`: 130
  - `current-season`: 2024
- Super Copa
  - `league-id`: 810
  - `current-season`: 2024
- Copa Trofeo de Campeones
  - `league-id`: 517
  - `current-season`: 2024
- Primera Nacional
  - `league_id`: 129
  - `current-season`: 2024
- Primera B Netropolitana:
  - `league_id`: 131,
  - `current-season`: 2024
- Primera C:
  - `league_id`: 132
  - `current-season`: 2024

### World

- CONMEBOL Libertadores:
  - `league-id`: 13
  - `current-season`: 2024
- CONMEBOL Sudamericana:
  - `league-id`: 11
  - `current-season`: 2024
- CONMEBOL Sudamericana:
  - `league-id`: 541
  - `current-season`: 2024
- UEFA Champions League:
  - `league-id`: 2
  - `current-season`: 2023
- UEFA Champions League:
  - `league-id`: 3
  - `current-season`: 2023
- UEFA Conference League: -`league-id`:848 -`current-season`:2023
- UEFA Supercup: -`league-id`:531 -`current-season`:2023
