import { conn } from "../databases/connection.js";
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


