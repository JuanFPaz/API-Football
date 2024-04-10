const express = require('express')
const {verPathDelArchivo} = require('./app/prueba')

const app = express()

app.get('/',(req,res)=>{
    console.log('Conexion con exito :)');
    verPathDelArchivo()
})

app.listen(3000, () => {
  console.log('Server: http://localhost:3000')
  setTimeout(()=>{console.log('Simulando tarea asincrona');},5000)
})