const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({ mensaje: 'probando primer response xd' })
})

app.listen(3000, () => {
  console.log('Server: http://localhost:3000')
})
