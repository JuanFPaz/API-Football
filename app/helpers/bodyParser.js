const bodyParse = (req, res, next) => {
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
