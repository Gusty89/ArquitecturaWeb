import bcryptjs from 'bcryptjs'
import  jwt  from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'


// /users/register
const register = async(req,res)=>{
    try {

        const{username, email, password} = req.body

        //Validación para comprobar si se han ingresado todos los campos requeridos

        if(!username || !email || !password){
            return res.status(400).json({
                ok: false,
                mensaje: "Falta ingresar algún campo: email, username, password"
            })
        }

        //Verificar que el mail creado no se encuentre en la base de datos

        const user = await userModel.findOneByEmail(email)
        if(user){
            return res.status(409).json({
                ok: false,
                mensaje: "Ya existe el email"
            })
        }

        
        //Se crea saltos para que cada vez que se genere un nuevo usuario con una contraseña igual, se establezca un nuevo hash
        const salt = await bcryptjs.genSalt(10)

        //Se aplica el hashing para que la password de la bd no esté en texto plano
        const hashPassword = await bcryptjs.hash(password,salt)

        //Creación de un nuevo usuario y se pasa el hash por parámetro
        const newUser = await userModel.create({email, password: hashPassword, username})

        //Aplicar el token al email
        const token = jwt.sign ({
            email: newUser.email
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
        const{email, password} = req.body

        //Validación para comprobar si se han ingresado todos los campos requeridos

        if(!email || !password){
            return res.status(400).json({
                ok: false,
                mensaje: "Falta ingresar algún campo: email, password"
            });
        }
        const user = await userModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({error: "Credenciales invalidas"});
        }
        const token = jwt.sign ({email: user.email},
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
        const user = await userModel.findOneByEmail(req.email)
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
