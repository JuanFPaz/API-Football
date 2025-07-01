/* eslint-disable no-unreachable */
const { access } = require('node:fs/promises')
const { resolve, join } = require('node:path')
const createDir = require('../../helpers/createDir')

const DATA_PATH = resolve(__dirname, '../../data')

/** Este es el más feo, asi que toca arreglarlo
 * 1/7/25 */

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
  const nameDir = country[0].toLowerCase()

  const FILE_NAME = `${nameDir}.json`
  const PATH_DIR = join(DATA_PATH, nameDir)
  const PATH_FILE = join(PATH_DIR, FILE_NAME)

  try {
    await access(PATH_DIR) // <- Automaticamente, si el directorio que le pasamos no existe, se pasa al bloque catch
  } catch (error) {
    // En el bloque catch, se encarga de crear el directorio, createDir,
    //  se encarga de capturar un error interno o inesperado cuando creamos el directorio.
    const checkMk = await createDir(PATH_DIR)
    if (!checkMk.status) {
      throw checkMk
    }
  }
  const pathFormateada = {}
  /* Verificamos que el JSON no exista */
  /* Aca me hice medio un lio, entiendo perfectamente que hace,
  pero no me convence la idea de retornar el valor final en el CATCH despues del
  error.fileExist -.- */
  /** 20/6/2025 - Anulo por ahora la restriccion de NO editar */
  try {
    await access(PATH_FILE) /** Si el archivo no existe,
    // en el catch retornamos la ruta al directorio recien creado,
    // si existe, finalizamos el processo */
    // const customError = {
    //   process: 'validateRutaLinks',
    //   message: 'El archivo ya existe, no podes sobreescribirlo. Para sobreescribri un archivo utiliza el PUT o PATCH.',
    //   fileExist: true
    // }
    // throw customError
    /** Con esto despeus del acces, podemos reescribir. Si queremos limitar a que no se soobreescriba,
     * descomentar lo de arriba y lo del catch ._.
     */
    pathFormateada.pathLink = PATH_FILE
    return pathFormateada
  } catch (error) {
    // if (error.fileExist) {
    //   pathFormateada.pathLink = PATH_FILE
    //   return pathFormateada
    // } else if (error.code === 'ENOENT') {
    //   /* Retornamos la ruta de app/data/brazil + el nobmre del archivo,
    //   para que en el processCreateLinks,
    //   cree el archivo en la ruta especificada con el nombre especifico del archivo. */
    //   pathFormateada.pathLink = PATH_FILE
    //   return pathFormateada
    // }
    pathFormateada.pathLink = PATH_FILE
    return pathFormateada
  }
}

module.exports = validateCountryLinks
