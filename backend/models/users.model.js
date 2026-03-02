import { db } from "../config/db.js";

export const userModel = {
    async createUser(email,password,profile_photo){
            const result = await db.query("INSERT INTO users(email,password,profile_photo) VALUES($1, $2, $3) RETURNING *",[email,password,profile_photo]);
            return result.rows[0];  
    },

    async findUserById(id){
        const result = await db.query("SELECT * FROM users WHERE id = $1",[id]);
        return result.rows[0];
    },

    async findUserByEmail(email){
        const res  = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        return res.rows[0];
    },

    async updateUser(id,username,bio,profile_photo){
        const result = await db.query("UPDATE users SET username = $1,bio = $2,profile_photo = $3 WHERE id = $4 RETURNING *",[username,bio,profile_photo,id]);
        return result.rows[0];
    },

    async findById(id) {
  const result = await db.query(
    "SELECT id, username, bio, profile_photo FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

};