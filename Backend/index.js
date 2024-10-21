import 'dotenv/config'
import express from 'express'
import userRouter from './src/routes/user.routes.js'
import publicRouter from './src/routes/public.routes.js'

const app = express();
const PORT = process.env.PORT || 3000

// Middleware para servir archivos estáticos (ej. imágenes, CSS, JS)

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static('pruebasFront'))
//Creación de rutas
app.use('/', publicRouter)
app.use('/users', userRouter)

// Creación del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
