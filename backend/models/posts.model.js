// posts array contains actual dataset
//postModel our db is an object that contains  functions

import env from "dotenv";
env.config();
import { db } from "../config/db.js";




export const postModel = {
    // findAll(){
    //     return posts;
    // },
    
    async findAll(){
        const posts = await db.query("SELECT * FROM posts");
        return posts.rows;
    },



    async findById(id){
        // return posts.find((post)=> post.id == id);
        const post = await db.query("SELECT * FROM posts WHERE id = $1",[id]);
        return post.rows[0];
    }, 

    async findByUserId(user_id){
        const posts = await db.query("SELECT * FROM posts WHERE user_id = $2",[user_id]);
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

        const result = await db.query("UPDATE posts SET title= $1, image= $2, content= $3 WHERE id= $4 RETURNING *",[data.title, data.image, data.content, id]);
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

    

};
