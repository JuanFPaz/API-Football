const bodyParse = (req, res, next) => {
  /**
   * Se encarga de guardar el cuerpo de la solicitud en el objeto req.body
   * Si todo sale bien, la forma del req.body queda:
   * {
   *  id:[1,2,3,4],
   *  country:["fifa"]
   * }
   */
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    try {
      req.body = JSON.parse(body)
      next()
    } catch (error) {
      const data = {}
      data.url = req.url
      data.timestamp = Date.now()
      data.error = 'No se aceptan bodys vacios'
      res.status(400).json(data)
    }
  })
}

module.exports = bodyParse
