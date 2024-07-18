const { access } = require('node:fs/promises')

const { join, resolve } = require('node:path')

const DATA_PATH = resolve(__dirname, '../../data')

async function validateLinksArg () {
  const dataPath = join(DATA_PATH, 'argentina', 'argentina.json')
  try {
    await access(dataPath)
  } catch (err) {
    const customError = {
      middReference: 'validateURL',
      process: 'helper',
      message: err
    }
    throw customError
  }

  return dataPath
}

async function validateLinksEng () {
  const dataPath = join(DATA_PATH, 'england', 'england.json')
  try {
    await access(dataPath)
  } catch (err) {
    const customError = {
      middReference: 'validateURL',
      process: 'helper',
      message: err
    }
    throw customError
  }

  return dataPath
}

async function validateLinksCups (nation) {
  const dataPath = join(DATA_PATH, nation, `${nation}.json`)
  try {
    await access(dataPath)
  } catch (err) {
    const customError = {
      middReference: 'validateURL',
      process: 'helper',
      message: err
    }
    throw customError
  }

  return dataPath
}

module.exports = {
  validateLinksArg,
  validateLinksEng,
  validateLinksCups
}
