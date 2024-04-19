/* eslint-disable no-unused-vars */
const { writeFile, readFile } = require('node:fs/promises')
const { join } = require('node:path')

const processCrearArchivo = async (...params) => {
  let dataArchivo
  let dataPath

  try {
    const [app, util, file] = params
    dataPath = join(app, util, file)
  } catch (error) {
    console.error('Ocurrio un error en el primer catch de Procces')
    throw Error('Se esperaban al menos 4 parametros y recibimos ' + params.length)
  }

  try {
    const [,,, data] = params
    dataArchivo = await writeFile(dataPath, data)
    console.log(!dataArchivo)
    if (dataArchivo) {
      console.error('Ocurrio un error el thow del segundo try de Procces')
      throw Error(dataArchivo)
    }
  } catch (err) {
    console.error('Ocurrio un error en el segundo catch de Procces')
    throw Error(err)
  }
  console.log('llegamos aca?')
  return dataArchivo
}
async function crearArchivo () {
  const dataArchivo = {}
  const NAME_FILE = '/Luxita.txt'
  const DATA_FILE = 'miau miau'

  try {
    await processCrearArchivo('app', 'util', NAME_FILE, DATA_FILE)
    dataArchivo.ok = true
  } catch (err) {
    return { error: err }
  }
  return dataArchivo
}

const processLeerArchivo = async (...params) => {
  let dataArchivo
  let dataPath

  // verificamos primero los params de la ruta
  try {
    const [app, util, file] = params
    dataPath = join(app, util, file)
  } catch (error) {
    console.error('Ocurrio un error en el primer catch de Procces')
    throw Error('Se esperaban al menos 3 parametros y recibimos ' + params.length)
  }

  // Simplemente leemos el archivo, readFile va a detectar si hay algun error con la path, o el archivo o algo por el estilo xd
  try {
    dataArchivo = await readFile(dataPath, 'utf-8')
  } catch (err) {
    console.error('Ocurrio un error en el segundo catch de Procces')
    throw Error(err)
  }
  console.log('llegamos aca?')
  return dataArchivo
}

async function leerArchivo () {
  let dataArchivo
  const NAME_FILE = '/miau.txt'
  try {
    dataArchivo = await processLeerArchivo('app', 'util', NAME_FILE)
  } catch (err) {
    return { error: err }
  }
  return dataArchivo
}

async function solicitudLeerArchivo () {
  let data
  try {
    data = await leerArchivo()
    if (data.error) {
      throw data.error
    }
    console.log('Data leida:')
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}

async function solicitudCrearArchivo () {
  let data
  try {
    data = await crearArchivo()
    if (data.error) {
      throw data.error
    }
    console.log('Data creada: ' + data.ok)
  } catch (error) {
    console.log(error.message)
  }
}

solicitudCrearArchivo()
// solicitudLeerArchivo()
