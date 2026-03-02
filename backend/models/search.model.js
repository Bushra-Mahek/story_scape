import { db } from "../config/db.js";


export const searchModel = {
    async getSearchPosts(keyword){
        const response = await db.query("select * from posts where author ilike $1 or title ilike $1 or content ilike $1 order by date desc limit 1",[`%${keyword}%`]);
        return response.rows;
    } 
};