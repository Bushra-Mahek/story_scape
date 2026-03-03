// posts array contains actual dataset
//postModel our db is an object that contains  functions

import env from "dotenv";
env.config();
import { db } from "../config/db.js";
import { getAllUnreadPosts } from "../controllers/posts.js";




export const postModel = {
    // findAll(){
    //     return posts;
    // },
    
    async findAll(userId){
        const result = await db.query(`
        SELECT 
            posts.*,
            COUNT(likes.id) AS like_count,
            EXISTS (
                SELECT 1 FROM likes
                WHERE likes.post_id = posts.id
                AND likes.user_id = $1
            ) AS liked_by_user
        FROM posts
        LEFT JOIN likes ON likes.post_id = posts.id
        GROUP BY posts.id
        ORDER BY posts.id DESC
    `, [userId]);

    return result.rows;
    },



    async findById(id){
        // return posts.find((post)=> post.id == id);
        const post = await db.query("SELECT * FROM posts WHERE id = $1",[id]);
        return post.rows[0];
    }, 

    async findByUserId(user_id){
        const posts = await db.query("SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC",[user_id]);
        return posts.rows;
    },

  



   

    async create(post){
        // const newPost = {
        //     id : ++lastId,
        //     title : post.title,
        //     author : post.author,
        //     content : post.content,
        //     date : new Date().toISOString(),
        //     image : post.image || null,
        // }
        // posts.push(newPost);
        // return newPost;
    
        let imageurl = null;
        if(post.imageUrl){
            imageurl = post.imageUrl;
        }
        const newPost = await db.query("INSERT INTO posts(title,author,content,date,image,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[post.title,post.author,post.content,post.date,imageurl,post.user_id]);
        return newPost.rows[0];
    },

    async update(id,data){
        // const post = posts.find((post)=> post.id == id);
        // if(!post){
        //     return null;
        // }
        // //?? instead of || coz if data.title had "" then also it will send the empty string
        // //  ?? assures that there's some string otherwise its null
        // post.title = data.title ?? post.title;
        // post.author = data.author ?? post.author;
        // post.content = data.content ?? post.content;
        // post.image = data.image ?? post.image;

        const result = await db.query("UPDATE posts SET title= $1, image= $2, content= $3 WHERE id= $4 AND user_id = $5 RETURNING *",[data.title, data.image, data.content,id,data.user_id]);
        if(result.rowCount === 0){
            return null;
        }
        return result.rows[0];
    },

    async delete(id){
        // const index = posts.findIndex((post)=> post.id == id);
        // if(index != -1){
        //     posts.splice(index,1);
        //     return true;
        // }
        // else{
        //     return false;
        // }
        const result = await db.query("DELETE FROM posts WHERE id = $1",[id]);
        if(result.rowCount === 0){
            return false;
        }
        return true;
    },

    async insertInPostViews(pid,uid){
        const view_post = await db.query("insert into post_views(post_id,user_id) values($1,$2) on conflict(post_id,user_id) do nothing returning *",[pid,uid]);
        return view_post.rows[0] || null;
    },


    async getAllUnreadPosts(uid){
        const result = await db.query("select id, title, author, date from posts where not exists(select 1 from post_views where post_views.post_id = posts.id and post_views.user_id = $1) order by date desc",[uid]);
        return result.rows;
    }

    

};
