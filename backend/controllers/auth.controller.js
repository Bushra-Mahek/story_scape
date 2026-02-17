import { userModel} from "../models/users.model.js";
//import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltrounds = 7;
console.log("BACKEND SECRET:", process.env.JWT_SECRET);
export const register = async (req,res)=>{
    console.log(req.body);
    const {email , password} = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
}
    try{
    const existingUser = await userModel.findUserByEmail(email);
        if(existingUser > 0){
            return res.status(400).json("user already exists withe the email");
        }
        else{
            const hashedPassword = await bcrypt.hash(password,saltrounds);
            const result = await userModel.createUser(email, hashedPassword);
            return res.status(201).json({message: "user has been registerd successfully"});
        };
    }
    catch(err){
        return res.status(500).json("server error");
    }
};

export const login = async (req,res)=>{
    console.log(req.body);
    const {email , password} = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
}
    try{
        const result = await userModel.findUserByEmail(email);
        if(!result){
            return res.status(404).json("user not found");
        }
        const user = result;
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return res.status(401).json({error: "invalid credentials"});
        }
        const token = jwt.sign({id:user.id, email: user.email},process.env.JWT_SECRET,{expiresIn : "1d"});
        return res.json({token});
    }

    catch(err){
        return res.status(500).json({error : "server error"});
    }
};
