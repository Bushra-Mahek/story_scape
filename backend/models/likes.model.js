
import { db } from "../config/db.js";

export const likesModel = {
    async countLikes(pid){
        const result = await db.query("select count(*) from likes where post_id = $1",[pid]);
        return parseInt(result.rows[0].count);
    },

    async createLike(pid,uid){
        const result = await db.query("insert into likes(post_id, user_id) values($1,$2) on conflict (post_id, user_id) do nothing returning *",[pid,uid]);
        return result.rows[0] || null;
    },

    async deleteLike(pid,uid){
        const result = await db.query("delete from likes where post_id = $1 and user_id = $2",[pid,uid]);
        return result.rowCount > 0;
    }
}