/* eslint-disable no-unreachable */
const { writeFile, access, mkdir } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { axionLinksIds } = require('../../helpers/axion')

const DATA_PATH = resolve(__dirname, '../../data')

async function processCreateLinks ({ country, id }) {
  let countryName
  let nameDir
  let nameFile

  try {
    const [_countryName, _nameDir] = country
    countryName = _countryName
    nameDir = _nameDir || _countryName.toLowerCase()
    nameFile = nameDir
    console.log(nameFile)
  } catch (err) {
    const customError = {
      isCustomError: true,
      procces: 'processCreateLinks',
      reference: 'Ocurrio un error desestructurando el arreglo de Params en el processCreateLinks',
      message: err.message
    }
    throw customError
  }

  const PATH_DIR = join(DATA_PATH, nameDir)
  const NAME_FILE = join(PATH_DIR, `${nameFile}.json`)

  try {
    /* Primero verificamos si el directorio app/data/nameFile/ existe, porque sino, da un error y explota todo */
    await access(PATH_DIR) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
  } catch (err) {
    if (err.code !== 'ENOENT') {
      const customError = {
        isCustomError: true,
        procces: 'processCreateLinks',
        reference: 'Ocurrio un error Creando el directorio ' + nameDir,
        message: err.message
      }
      throw customError
    }
  }

  try {
    await mkdir(PATH_DIR)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      const customError = {
        isCustomError: true,
        procces: 'processCreateLinks',
        reference: 'Ocurrio un error Creando el directorio ' + nameDir,
        message: err.message
      }
      throw customError
    }
  }

  try {
    await access(NAME_FILE)
    const customError = { isCustomError: true, process: 'processCreateLinks', reference: 'archivo existente.', message: 'El archivo ya existe, no se puede Sobreescribir. En caso que necesites actualizarlo, usar el updateJson cabron.' }
    return customError
  } catch (error) {
    const arregloDeLinks = await axionLinksIds(countryName, id)
    const arregloParameters = arregloDeLinks.map(lk => {
      const { parameters } = lk
      return parameters
    })
    const arregloResponse = arregloDeLinks.map(lk => {
      const { response: [link] } = lk
      return link
    })
    const data = {
      get: arregloDeLinks[0].get,
      parameters: arregloParameters,
      errors: arregloDeLinks[0].errors,
      results: arregloResponse.length,

      paging: arregloDeLinks[0].paging,
      response: arregloResponse
    }

    await writeFile(NAME_FILE, JSON.stringify(data))
    return { message: 'Recurso creado correctamente, ponele (?' }
  }
}

module.exports = {
  processCreateLinks
}
