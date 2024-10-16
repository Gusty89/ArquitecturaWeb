import { conn } from "../databases/connection.js";
export const allUsersCtrl = (req, res)=>{
    res.send("All users");
};
//Esta parte del código sirve para la conexión a la base de datos una vez se haya creado
/*
export const allUsersCtrl = async (req, res)=>{
    try {
        const [resultados] = await conn.query("SELECT * FROM users");
        res.json(resultados);
    } catch (error) {
        console.log(error)
        res.json({
            mensaje: "Error con la base de datos",
        });
    }
};
*/

