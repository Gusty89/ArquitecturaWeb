import 'dotenv/config'
import pg from 'pg'
const {Pool} = pg

const connectionString = process.env.DATABASE_URL
export const db = new Pool({
    allowExitOnIdle: true, //Para cerrar automáticamente las conexiones
    connectionString

})
    try {
        await db.query('SELECT NOW()')   
        
        console.log("Conexión exitosa a la base de datos")}

    catch (error) {
        console.log(error)
}
 