import { db } from '../database/connection.js'

const create = async({dni, username, password, name})=>{
    const query = {
        text: `
        INSERT INTO users (username, password, id)
        VALUES($1, $2, $3)
        RETURNING username, password, id
        `,
        values: [dni, username, password, name]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const findForUsername = async (username)=>{
    const query = {
        text: `
        SELECT * FROM users
        WHERE USERNAME = $1
        `,
        values : [username]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
   

export const userModel = {
    create,
    findForUsername
}
