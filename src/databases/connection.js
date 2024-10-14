import { createPool } from "mysql2";//una pool es una sola conexión con muchas peticiones
import { 
    DB_NAME, 
    DB_PASSWORD, 
    DB_USER, 
    DB_HOST, 
    DB_PORT 
} from "../settings/environments.js";
const createMyPool = ()=> {
    try {
        const pool = createPool({
            database: DB_NAME,
            password: DB_PASSWORD,
            user: DB_USER,
            host: DB_HOST,
            port: DB_PORT,    
        });
        console.log("Conexión exitosa a la base de datos");

        return pool;
    } catch (error) {
        console.log("Hubo un error al conectar a la base de datos");
    }
};

const conn = createMyPool();

export{ conn };