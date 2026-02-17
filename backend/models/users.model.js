import { db } from "../config/db.js";

export const userModel = {
    async createUser(email,password){
            const result = await db.query("INSERT INTO users(email,password) VALUES($1, $2) RETURNING *",[email,password]);
            return result.rows[0];  
    },

    async findUserById(id){
        const result = await db.query("SELECT * FROM users WHERE id == $1",[id]);
        return result.rows[0];
    },

    async findUserByEmail(email){
        const res  = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        return res.rows[0];
    }

};