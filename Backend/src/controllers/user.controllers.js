import bcryptjs from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'


// /users/register
const register = async(req,res)=>{
    try {

        const{dni,username,password,name} = req.body

        //Validación para comprobar si se han ingresado todos los campos requeridos

        if(!dni || !username || !password || !name){
            return res.status(400).json({
                ok: false,
                mensaje: "Falta ingresar algún campo: dni, username, password, name"
            })
        }

        //Verificar que el mail creado no se encuentre en la base de datos

        const user = await userModel.findForUsername(username)
        if(user){
            return res.status(409).json({
                ok: false,
                mensaje: "Ya existe el usuario"
            })
        }

        
        //Se crea saltos para que cada vez que se genere un nuevo usuario con una contraseña igual, se establezca un nuevo hash
        const salt = await bcryptjs.genSalt(10)

        //Se aplica el hashing para que la password de la bd no esté en texto plano
        const hashPassword = await bcryptjs.hash(password,salt)

        //Creación de un nuevo usuario y se pasa el hash por parámetro
        const newUser = await userModel.create({dni, username,password: hashPassword,name})

        //Aplicar el token al password
        const token = jwt.sign ({
            password: newUser.password
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({ok: true, msg: token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error del servidor"
        })
    }
}

// /users/login
const login = async(req,res)=>{
    try {
        const{username, password} = req.body

        //Validación para comprobar si se han ingresado todos los campos requeridos

        if(!username || !password){
            return res.status(400).json({
                ok: false,
                mensaje: "Falta ingresar algún campo: username, password"
            });
        }
        const user = await userModel.findForUsername(username)
        if(!user){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({error: "Credenciales invalidas"});
        }
        const token = jwt.sign ({username: user.username},
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({ok: true, msg: token})


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error del servidor"
        })
    }
}

//Realizar una ruta protegida para la información del usuario
const profile = async(req,res)=>{
    try {
        const user = await userModel.findForUsername(req.username)
        res.status(200).json({ok: "Acceso permitido", msg: user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error del servidor"
        })
    }
}
export const userController = {
    register,
    login,
    profile
}
