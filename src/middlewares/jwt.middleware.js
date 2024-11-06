import jwt from 'jsonwebtoken'

//Esta función se ejecuta antes de buscar en la ruta profile
export const verifyToken = (req, res, next) =>{
    let token = req.headers.authorization

    //Se realiza la validación para saber si existe un token que me permita ingresar al sistema
    if(!token){
        return res.status(401).json({error: "No se permite ingresar, porque no se colocó el token de seguridad"});
    }

    //Se muestra solo el token sin el Bearer 
    token = token.split(" ")[1]

    //En esta parte se verifica que el token sea válido
    try {
        //Nos devuelve el payload del email
        const {username} = jwt.verify(token, process.env.JWT_SECRET)

        req.username = username
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "El token no es válido"})
    }
   
}
