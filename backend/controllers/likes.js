import { likesModel } from "../models/likes.model.js";

// export const countLikes = async (req,res)=>{
//     try{
//         const pid = req.params.id;
//         const count = await likesModel.countLikes(pid);
//         console.log(count);
//         res.json({count});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"server error"});
//     }
// };

export const createLike = async(req,res)=>{
    try{
        const pid = +req.params.id;
        const uid = req.user.id;
        await likesModel.createLike(pid,uid);
        const count = await likesModel.countLikes(pid);
        res.json({liked: true,count});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
};


export const deleteLike = async(req,res)=>{
    try{
        const pid = +req.params.id;
        const uid = req.user.id;
        await likesModel.deleteLike(pid,uid);

        const count = await likesModel.countLikes(pid);
        res.json({liked: false,count});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
};