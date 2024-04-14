const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT ?? 3000

app.use(cors())

app.get('/', (req, res) => {
  res.json({ mensaje: 'probando primer response xd' })
})

app.get('/fixtures', (req, res) => {

})
app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT)
})
