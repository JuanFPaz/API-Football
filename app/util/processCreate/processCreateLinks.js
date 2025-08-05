const { writeFile } = require('node:fs/promises')
const { axionLinksIds } = require('../../helpers/axion')

async function processCreateLinks ({ country, code, id, path }) {
  try {
    const arregloDeLinks = await axionLinksIds(id)
    const arregloParameters = arregloDeLinks.map(lk => {
      const { parameters } = lk
      return parameters
    })
    const arregloResponse = arregloDeLinks.map(lk => {
      const { response: [dataLeagues] } = lk
      dataLeagues.country.name = country[0]
      dataLeagues.country.code = code[0].toUpperCase()
      return dataLeagues
    })
    const data = {
      get: arregloDeLinks[0].get,
      parameters: arregloParameters,
      errors: arregloDeLinks[0].errors,
      results: arregloResponse.length,

      paging: arregloDeLinks[0].paging,
      response: arregloResponse
    }

    await writeFile(path, JSON.stringify(data))
    return { message: `Los datos solicitados de ${country[0]} fueron creados correctamente.` }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  processCreateLinks
}
