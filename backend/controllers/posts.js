import { postModel } from  "../models/posts.model.js";
import cloudinary from "../config/cloudinary.js";

import { profile } from "console";

export const getAllPosts = async (req,res)=>{
    try{
        const result = await postModel.findAll();
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error :"server error"});
    }
};

export const getPostById = async (req,res)=>{
    try{
    const post = await postModel.findById(+req.params.id);
    if(!post){
        return res.status(404).json({error: "post not found"});
    }
    console.log(post);
    res.json(post);
    }
    catch(err){
        res.status(500).json({error :"server error"});
    }
};

export const getEditPage = async (req,res)=>{
    try{
    const post = await postModel.findById(+req.params.id);
    if(!post){
        return res.status(404).json({error:"edit page not found"});
    }
    console.log(post);
    res.json(post);
    }
    catch(err){
        res.status(500).json({error :"server error"});
    }
};

export const createPost = async (req,res)=>{
    try{
        console.log("body:", req.body);
    let imageUrl = null;
    if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
    }
    const userId = req.user.id;
    const post = await postModel.create({
        title : req.body.title,
        author : req.body.author,
        content : req.body.content,
        user_id : userId,
        imageUrl,
    });
    res.status(201).json(post);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error :"server error"});
    }
};

export const updatePost = async (req,res)=>{
    console.log(req.user.id);
    try {
         console.log("REQ PARAM ID:", req.params.id);
            console.log("REQ USER ID:", req.user.id);

const existingPost = await postModel.findById(+req.params.id);
console.log("POST FROM DB:", existingPost);;

        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        let imageUrl = existingPost.image;  // 👈 preserve old image

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        const userId = req.user.id;
       
        const updatedPost = await postModel.update(+req.params.id, {
            title: req.body.title,
            content: req.body.content,
            image: imageUrl,
            user_id: userId,  // 👈 always send valid image
        });

        res.json(updatedPost);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error :"server error"});
    }
};

export const deletePost = async (req,res) =>{
    try{
        const deleted = await postModel.delete(+req.params.id);
    if(deleted){
        res.sendStatus(204);
    }
    else{
        return res.status(404).json({error : `post with id ${+req.params.id} not found`});
    }
    }

    catch(err){
        res.status(500).json({error :"server error"});
    }
    
};

export const getPostsByUser = async (req,res) =>{
    try{
        const userId = req.user.id;
        const result = await postModel.findByUserId(userId);
        console.log(result);
        res.json(result);
    }

    catch(err){
        console.error(err);
        res.status(500).json({error : "server error"});
    }
};

