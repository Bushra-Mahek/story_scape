import { db } from "../config/db.js";

export const statsModel = {

    async getSummary(){
        const totalUsers = await db.query("select count(*) from users");
        const totalPosts = await db.query("select count(*) from posts");

        const mostActive = await db.query("select u.username, count(p.id) as post_count from users as u left join posts as p on p.user_id = u.id group by u.id, u.username order by post_count desc limit 1");

        return {
            totalUsers : Number(totalUsers.rows[0].count),
            totalPosts : Number(totalPosts.rows[0].count),
            mostActive : mostActive.rows[0] || { username: "N/A", post_count: 0 }
        };
    },

    async getPostsPerUser(){
        return await db.query("select u.username, count(p.id) as post_count from users as u left join posts as p on p.user_id = u.id group by u.id, u.username order by post_count desc");
    },

    async getPostsPerMonth(){
        return await db.query("select to_char(date_trunc('month', date), 'Mon YYYY') as month, count(*) as post_count from posts group by date_trunc('month', date) order by date_trunc('month', date)");
    }
}