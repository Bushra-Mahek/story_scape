import { userModel } from "../models/users.model.js";
import cloudinary from "../config/cloudinary.js";

export const updateUserProfile = async (req,res) =>{
    try{
        let photoUrl = req.user.profile_photo;
        if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }

    const result = await userModel.updateUser(req.user.id,req.body.username,req.body.bio,photoUrl);

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
};

export const getCurrentUser = async (req,res)=>{
    try{
        const response = await userModel.findUserById(req.user.id);
        console.log(response);
        res.json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error:"server error"});
    }
};


export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

