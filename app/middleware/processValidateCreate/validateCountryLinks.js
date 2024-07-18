/* eslint-disable no-unreachable */
const { access } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const createDir = require('../../helpers/createDir')

const DATA_PATH = resolve(__dirname, '../../data')

async function validateCountryLinks ({ country }) {
  try {
    if (country.length === 0) {
      throw Error('Se esperaba un arreglo y recibimos un arreglo vacio')
    }
  } catch (err) {
    const customError = {
      reference: 'Ocurrio un error manipulando los datos del Country',
      process: 'validateRutaLinks',
      message: err.message
    }
    throw customError
  }
  /* TODO: Si pasamos un country:[null], cosa que no se porque pasaria
    pero si pasa, el error no se va a capturar correctamente, y en el response devolvera un objeto vacio
    capturar ese error!
  */
  const [pCountry, fCountry] = country
  const nameDir = fCountry || pCountry
  const FILE_NAME = `${nameDir}.json`
  const PATH_DIR = join(DATA_PATH, nameDir.toLowerCase())
  const PATH_FILE = join(PATH_DIR, FILE_NAME)

  /** En teoria, para llegar hasta aca, debemos comprobar que los bodys sean los que esperamos */
  try {
    await access(PATH_DIR) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
  } catch (error) {
    // En el bloque catch, se encarga de crear el directorio, createDir, se encarga de capturar un error interno o inesperado cuando creamos el directorio.
    const checkMk = await createDir(PATH_DIR)
    if (!checkMk.status) {
      throw checkMk
    }
  }
  const pathFormateada = {}
  /* Verificamos que el JSON no exista */
  /* Aca me hice medio un lio, entiendo perfectamente que hace, pero no me convence la idea de retornar el valor final en el CATCH despues del error.fileExist -.- */
  try {
    await access(PATH_FILE) /** Si el archivo no existe, en el catch retornamos la ruta al directorio recien creado, si existe, finalizamos el processo */
    const customError = {
      process: 'validateRutaLinks',
      message: 'El archivo ya existe, no podes sobreescribirlo. Para sobreescribri un archivo utiliza el POST.',
      fileExist: true
    }
    throw customError
  } catch (error) {
    if (error.fileExist) {
      throw error
    } else if (error.code === 'ENOENT') {
      /* Retornamos la ruta de app/data/brazil + el nobmre del archivo, para que en el processCreateLinks, cree el archivo en la ruta especificada con el nombre especifico del archivo. */
      pathFormateada.pathLink = PATH_FILE
      return pathFormateada
    }
  }
}

module.exports = validateCountryLinks
