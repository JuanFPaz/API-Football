const express = require('express')

const app = express()

app.get('/', (req, res) => {
  console.log('Conexion con exito :)')
})

app.listen(3000, () => {
  console.log('Server: http://localhost:3000')
  setTimeout(() => { console.log('Simulando tarea asincrona') }, 5000)
})
