import { Router } from "express";
import path from "path"
const router = Router()

//Creación de una ruta absoluta, para evitar poner la extensión .html, solo funciona en la versión de node 22.9.0
const __dirname = import.meta.dirname

const publicPath = path.join(__dirname, '../pruebasFront')
router.get('/login',(req, res)=>{
    res.sendFile(publicPath + '/login.html')
})

router.get('/profile',(req, res)=>{
    res.sendFile(publicPath + '/profile.html')
})

export default router