const { mkdir } = require('node:fs/promises')

async function createDir (dir) {
  try {
    await mkdir(dir)
    const success = {
      message: 'Directorio creado con exito',
      status: true
    }
    return success
  } catch (err) {
    const error = {
      message: err.message,
      status: false,
      reference: JSON.stringify(err)
    }
    throw error
  }
}

module.exports = createDir
