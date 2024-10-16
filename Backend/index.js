import express from "express";
import { PORT } from './src/settings/environments.js';
import { userRoutes } from "./src/routes/user.routes.js";
import "./src/databases/connection.js";
//import cors from "cors";
//import bcrypt from "bcrypt";
//import cookieParser from "cookie-parser"; 
//import jsonwebtoken from "jsonwebtoken";
import morgan from "morgan";

const app = express();
//const bcrypt = require('bcrypt');
//const cookieParser = require('cookie-parser');
//const jsonwebtoken = require('jsonwebtoken');
//const morgan = require('morgan');

// Middleware para servir archivos estáticos (ej. imágenes, CSS, JS)
//app.use(cors()); //sirve para que un cliente que haga una petición de un host que no esté en el mismo puerto del servidor pueda acceder igual
//app.use(bcrypt());//sirve para hashear contraseñas
//app.use(cookieParser());//sirve para extraer y acceder a las cookies que el cliente envía al servidor
//app.use(jsonwebtoken());//
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan("dev"));//sirve para mostrar un código de respuesta cuando se hace una petición al servidor
// Ruta principal (home)
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esta es mi primera aplicación en Node.js con Express');
});

//Creación de rutas
app.use('/users',userRoutes);

// Creación del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
