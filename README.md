# API Football

## Info

- Documentacion API: [API Football - Documentacion (V3)](https://www.api-football.com/documentation-v3)
- Dashboard API: [Dashboard API Football](https://dashboard.api-football.com/)

### Descripcion endpoints de la API original (todavia no hice ningun endpoint xd)

| Endpoint    |Descripción                                                          |
|-------------|----------------------------------------------------------------------|
| `/countries`|Nos devuelve los países disponibles, con claves y valores para los Query Search. |
| `/leagues?country=Argentina` | Nos devuelve todas las ligas, copas de liga y copas nacionales disponibles por paises. |
| `/standings?league=128&season=2024` | Nos devuelve las tablas de posiciones por liga, copa de liga y temporada. |
| `/fixture?league=128&season=2024` | Nos devuelve los fixture completos de ligas, copas de liga y copa nacional/internacional. |
| `/fixture/rounds?league=130&season=2024` | Nos devuelve el fixture de una liga, copas de liga y copa nacional/internacional por rondas. |

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
  

```
app
|
|___data
|
|___utils
    |
    |___readJson.js
```
