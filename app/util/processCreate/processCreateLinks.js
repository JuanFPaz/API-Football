const { writeFile } = require('node:fs/promises')
const { axionLinksIds } = require('../../helpers/axion')

async function processCreateLinks ({ country, id, path }) {
  try {
    const arregloDeLinks = await axionLinksIds(country, id)
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

    await writeFile(path, JSON.stringify(data))
    return { message: 'Recurso creado correctamente, ponele (?' }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  processCreateLinks
}
