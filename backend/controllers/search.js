import { searchModel } from "../models/search.model.js";

export const getSearch = async (req,res)=>{
    try{
        const keyword = req.query.q;
        if(!keyword || keyword.trim() === ""){
            return res.json([]);
        }
        const response = await searchModel.getSearchPosts(keyword);
        console.log(response);
        res.json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).send({error : "server error"});
    }

}