const { access } = require('node:fs/promises')
const { resolve, join } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function validarReqParams ({ country, season, league }) {
  const rutaUno = join(DATA_PATH, country)
  const rutaDos = join(rutaUno, season)
  const rutaTres = join(rutaDos, league)

  try {
    await access(rutaUno)
    await access(rutaDos)
    await access(rutaTres)
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error leyendo los request params. Se ve que un segmento no es valido.',
      process: 'validarReqParams',
      message: err.message
    }
    throw customError
  }
}

module.exports = validarReqParams
