import { db } from '../database/connection.js'

const create = async({ username, password})=>{
    const query = {
        text: `
        INSERT INTO users (username, password)
        VALUES($1, $2)
        RETURNING username, uid
        `,
        values: [username, password]
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
