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
| `/leagues?country=Argentina`              | Nos devuelve todas las ligas, copas de liga y copas nacionales disponibles de un pais.                                   |
| `/leagues?country=Argentina&id=128`              | Nos devuelve la liga especificada por ID de un pais.                                   |
| `/standings?league=128&season=2024`       | Nos devuelve las tablas de posiciones por liga, copa de liga y temporada.                                                |
| `/fixtures?league=128&season=2024`        | Nos devuelve los fixture completos de ligas, copas de liga y copa nacional/internacional.                                |
| `/fixtures/rounds?league=130&season=2024` | Nos devuelve el fixture de una liga, copas de liga y copa nacional/internacional por rondas.                             |
| `/fixtures/statistics?fixture=1158464`    | Nos devuelve las estadisticas de los equipos en un partido especifico, utilizando la ID del fixture.                     |
| `/fixtures/events?fixture=1158464`        | Nos devuelve los eventos de un partido especifico, como los goles, tarjetas, penales, etc, utilizando la ID del fixture. |

## Paises, ligas y copas a obtener

### Nations

- Mundial de FIFA
  - `league_param`: 1
  - `country_name` : world
  - `current-season`: 2022
- Eurocopa
  - `country_name` : world
  - `league_param` : 4
  - `current-season:` 2024

- Copa America
  - `country_name` : world
  - `league_param` : 9
  - `current-season:` 2024

- Nation leaguezzzzzzzzzzz?
  - `country_name` : world
  - `league_param` : 5
  - `current-season:` 2024

- Amistosos FIFA
  - `country_name` : world
  - `league_param` : 10
  - `current-season:` 2024

### Argentina

- Liga Profesional
  - `country_name` : argentina
  - `league_param` : 128
  - `current-season:` 2024

- Copa de Liga Profesional
  - `country_name` : argentina
  - `league_param` : 128
  - `current-season:` 2024

- Copa Argentina
  - `country_name` : argentina
  - `league_param` : 130
  - `current-season:` 2024

- Super Copa
  - `country_name` : argentina
  - `league_param` : 810
  - `current-season:` 2024

- Copa Trofeo de Campeones
  - `country_name` : argentina
  - `league_param` : 517
  - `current-season:` 2024
  
- Copa de la superliga (predecesor de copa de la liga)
  - `country_name` : argentina
  - `league_param` : 483
  - `current-season:` 2020 -.-


### Brazil

- Serie A (Brasileirao)
  - `country_name` : brazil
  - `league_param` : 71
  - `current-season:` 2024
<!--   
- Primera Nacional
  - `league_id`: 129
  - `current-season`: 2024
- Primera B Netropolitana:
  - `league_id`: 131,
  - `current-season`: 2024
- Primera C:
  - `league_id`: 132
  - `current-season`: 2024 -->

### World

- CONMEBOL Libertadores:
  - `league-id`: 13
  - `current-season`: 2024
- CONMEBOL Sudamericana:
  - `league-id`: 11
  - `current-season`: 2024
- CONMEBOL Recopa Sudamericana:
  - `league-id`: 541
  - `current-season`: 2024
- UEFA Champions League:
  - `league-id`: 2
  - `current-season`: 2023
- UEFA Europa League:
  - `league-id`: 3
  - `current-season`: 2023
- UEFA Conference League:
  - `league-id`:848
  - `current-season`:2023
- UEFA Supercup:
  - `league-id`:531
  - `current-season`:2023
