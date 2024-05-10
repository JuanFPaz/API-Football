const { writeFile, access, mkdir } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const { axionLinks } = require('../../helpers/axion')

const DATA_PATH = resolve(__dirname, '../../data')

async function processCreateLinks (...params) {
  let countryName
  let nameDir
  let nameFile

  try {
    const [country] = params
    countryName = country[0]
    nameDir = countryName.toLowerCase()
    nameFile = nameDir
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
    /* Y ahora verificamos, si el archivo que queremos crear existe. En caso de que exista, cortamos el proceso.
      Ya que en esta solicitud solo creamos el recurso. Si queremos actualizar el JSON, vamos a utilizar el updateJSON.
      Las cosas por sus nombres. */

    await access(NAME_FILE)
    const customError = { isCustomError: true, process: 'processCreateLinks', reference: 'archivo existente.', message: 'El archivo ya existe, no se puede Sobreescribir. En caso que necesites actualizarlo, usar el updateJson cabron.' }
    return customError
  } catch (error) {
    const { data } = await axionLinks(nameDir)
    await writeFile(NAME_FILE, JSON.stringify(data))
    return { message: 'Recurso creado correctamente, ponele (?' }
  }
}

// async function processCreateLinksWorld (...params) {
//   let countryName
//   let ids
//   let nameDir
//   let nameFile

//   const PATH_FILE = join(DATA_PATH, nameFile)
//   const NAME_FILE = `${PATH_FILE}/${nameFile}.json`
//   try {
//     await access(PATH_FILE) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
//   } catch (error) {
//     if (error.code === 'ENOENT' && error.syscall === 'access') {
//       console.log('Creando el directorio ' + PATH_FILE)
//       await mkdir(PATH_FILE)
//     }
//   }

//   try {
//     await access(NAME_FILE)
//     console.log('El archivo ya existe, no se puede Sobreescribir. En caso que necesites actualizarlo, usar el updateJson cabron.')
//   } catch (error) {
//     if (error.code === 'ENOENT' && error.syscall === 'access') {
//       console.log('Creando el directorio ' + PATH_FILE)
//       await writeFile(NAME_FILE, JSON.stringify(data))
//     }
//   }
// }

module.exports = {
  processCreateLinks
}
