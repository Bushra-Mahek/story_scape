import { postModel } from  "../models/posts.model.js";
import cloudinary from "../config/cloudinary.js";

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
    const post = await postModel.create({
        title : req.body.title,
        author : req.body.author,
        content : req.body.content,
        imageUrl,
    });
    res.status(201).json(post);
    }
    catch(err){
        res.status(500).json({error :"server error"});
    }
};

export const updatePost = async (req,res)=>{
   
    try {
        const existingPost = await postModel.findById(+req.params.id);

        if (!existingPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        let imageUrl = existingPost.image;  // 👈 preserve old image

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const updatedPost = await postModel.update(+req.params.id, {
            title: req.body.title,
            content: req.body.content,
            image: imageUrl   // 👈 always send valid image
        });

        res.json(updatedPost);

    }
    catch(err){
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