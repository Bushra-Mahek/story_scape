/* ================= IMPORTS ================= */

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import bcrypt from "bcrypt";
import env from "dotenv";

import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import methodOverride from "method-override";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import jwt from "jsonwebtoken";

//import User from "./models/User.js";

/* ================= CONFIG ================= */

env.config();

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "storyscape_secret",
    resave: false,
    saveUninitialized: false
  })
);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage:storage});

//for put opeartion
app.use(methodOverride('_method'));

// const posts = [
//   {
//     id:1,
//     title:"Expalining how to balance life and work as a developer",
//     author:"John Doe",
//     date:"2025-10-12",
//     content:"Balancing life and work as a developer can be challenging. Here are some tips to help you manage your time effectively...",
//     image:"/images/post1.jpeg"
//   },
//   {
//     id:2,
//     title:"how I learned martial arts in 6 months",
//     author:"Jane Smith",
//     date:"2025-11-05",
//     content:"Learning martial arts requires dedication and practice. In this article, I will share my journey and the techniques that helped me improve quickly...",
//     image:"/images/post2.jpeg"
//   },
//   {
//     id:3,
//     title:"Top 10 travel destinations for developers",
//     author:"Alice Johnson",
//     date:"2025-09-20",
//     content:"As a developer, finding the right travel destinations can enhance your creativity and productivity. Here are my top 10 picks for places to visit...",
//     image:"/images/post3.jpg"
//   },
//   {
//     id:4,
//     title:"The future of AI in web development",
//     author:"Bob Brown",
//     date:"2025-12-01",
//     content:"Artificial Intelligence is transforming the web development landscape. In this article, we will explore the potential applications of AI and how it can benefit developers...",
//     image:"/images/post4.jpg"
//   },
//   {
//     id:5,
//     title:"Healthy habits for remote developers",
//     author:"Emily White",
//     date:"2025-08-15",
//     content:"Working remotely as a developer can lead to unhealthy habits. Here are some tips to maintain a healthy lifestyle while working from home...",
//     image:"/images/post5.jpg"
//   },
//   {
//     id:6,
//     title:"how to become a morning person as night owls",
//     author:"David Green",
//     date:"2025-07-30",
//     content:"Becoming a morning person can be challenging for night owls. In this article, I will share strategies that helped me adjust my sleep schedule and embrace the mornings...",
//     image:"/images/post6.jpg"
//   },
//   {
//     id:7,
//     title:"My day as an immigrant job holder",
//     author:"Bob Brown",
//     date:"2025-06-18",
//     content:"Being an immigrant job holder comes with its own set of challenges and experiences. In this article, I will share a typical day in my life and how I navigate the professional landscape...",
//     image:"/images/post7.jpg"
//   },
//   {
//     id:8,
//     title:"The impact of open source on modern software development",
//     author:"Alice Johnson",
//     date:"2025-05-22",
//     content:"Open source has revolutionized the software development industry. In this article, we will discuss the benefits of open source and how it has shaped modern development practices...",
//     image:"/images/post8.jpg"
//   },
//   {
//     id:9,
//     title:"Why u should start a home garden if you live in a city",
//     author:"Charlie Black",
//     date:"2025-04-10",
//     content:"Starting a home garden in the city can bring numerous benefits, from improving mental health to providing fresh produce. Here are some tips to help you get started...",
//     image:"/images/post9.jpg"
//   },
//   {
//     id:10,
//     title:"Tips if you are having a pet cat for the first time",
//     author:"Samantha Green",
//     date:"2025-03-05",
//     content:"Getting a pet cat for the first time can be both exciting and overwhelming. In this article, I will share some essential tips to help you care for your new feline friend...",
//     image:"/images/post10.jpg"
//   }
//]


function requireLogin(req,res,next){
  const token = req.session.token;

  if(!token){
    return res.redirect("/login");
  }

  try{
    console.log("SESSION:", req.session);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;

    next();
  }
  catch(err){
    req.session.destroy(()=>{
      return res.redirect("/login"); //Better to destroy with callback to ensure session is fully cleared before redirect.
    });
  }
};





//READ
// app.get('/',(req,res)=>{
//   res.render('index',{posts:posts});
// });


app.get("/", requireLogin, async (req,res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts`,{
      headers: {
        Authorization: `Bearer ${req.session.token}`,
      }
    });
    res.render("index.ejs",{posts : response.data});
  }
  catch(error){
    res.status(500).send("no posts found");
  }
});

// app.get('/posts/:id',(req,res)=>{
//   const id = parseInt(req.params.id);
//   const post = posts.find(p=>id == p.id);
//   if(!post){
//     return res.status(404).render('404',{message:"post not found"});
//   }
//   res.render('post',{post:post});
// });
app.get("/posts/:id", async (req,res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("post.ejs",{post :response.data});
  }
  catch (err){
    res.status(404).render("404", {message : `post with id ${req.params.id} not found`});
  }
});


//CREATE
// app.get('/compose',(req,res)=>{
//   res.render('compose');
// });

// app.post('/compose',upload.single('image'),(req,res)=>{
//   const {title,author,content} = req.body;
//   const image = req.file? `/uploads/${req.file.filename}`:null;

//   if(!title || !author || !content){
//     return res.status(404).render('404',{message:"title, author , content must be there"});
//   };

//   const newId = posts.length?Math.max(...posts.map(p=>p.id))+1 :1;

//   const newPost = {
//     id:newId,
//     title:title,
//     author:author,
//     date: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}),
//     content:content,
//     image,

//   };

//   posts.unshift(newPost);

//   res.redirect(`/posts/${newPost.id}`);

// });
app.get("/compose",(req,res)=>{
  res.render("compose.ejs");
});

app.post("/compose", upload.single("image"), async (req,res)=>{
  try{
    const formData = new FormData();
    formData.append("title", req.body.title);
    formData.append("author",req.body.author);
    formData.append("content",req.body.content);
    if(req.file){
      formData.append("image", fs.createReadStream(req.file.path));
    }
    await axios.post(`${API_URL}/posts`,formData,{
      headers : {...formData.getHeaders(), Authorization: `Bearer ${req.session.token}`,}
    });
    res.redirect("/");
  }

  catch(err){
    console.error(err.response?.data || err.message);
    res.status(500).send("error creating post");
  }
});

//UPDATE
// app.get('/posts/:id/edit',(req,res)=>{
//   const id = parseInt(req.params.id);
//   const post = posts.find(p=>id === p.id);
//   if(!post){
//     return res.status(404).render('404',{message:"post not found"});
//   }
//   res.render('edit',{post:post});
// });

app.get("/posts/:id/edit", async (req,res)=>{
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("edit.ejs", { post : response.data});
  } catch (err) {
    res.status(404).send(`post with id ${req.params.id} not found`);
  }
});


//
// app.put('/posts/:id',upload.single('image'),(req,res)=>{
//   const id = parseInt(req.params.id);
//   const { title,author,content } = req.body;
//   const image = req.file?`/uploads/${req.file.filename}`:null;

app.post("/posts/:id/edit", upload.single("image"), async (req,res)=>{
  try{

    const formData = new FormData();
    formData.append("title", req.body.title);
    formData.append("author", req.body.author);
    formData.append("content", req.body.content);

    if(req.file){
      formData.append("image", fs.createReadStream(req.file.path));
    }

    await axios.patch(`${API_URL}/posts/${req.params.id}`, formData, {
      headers: formData.getHeaders(),
    });

    res.redirect(`/posts/${req.params.id}`);
  }
  catch(err){
    res.status(404).send(`post with id ${req.params.id} not found`);
  }
});


//   //replacing in array
//   const postIWant = posts.find(p=>p.id === id);
//     if(!postIWant){
//     return res.status(404).render('404',{message:"post not found"});
//   }
//   postIWant.content = content || postIWant.content;
//   if(image){
//     postIWant.image = image;
//   }

//   const index = posts.findIndex(p=>p.id === id);
//   if(index != -1){
//     posts[index] = postIWant;
//   }

//   //redirecting
//   res.redirect(`/posts/${id}`);

  
// });





//DELETE
// app.delete('/posts/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = posts.findIndex(p => p.id === id);

//   if (index === -1) {
//     return res.status(404).render('404', { message: "Post not found" });
//   }

//   posts.splice(index, 1); // remove from array
//   res.redirect('/'); // go back to homepage
// });
app.delete("/posts/:id/delete", async (req,res)=>{
await axios.delete(`${API_URL}/posts/${req.params.id}`);
res.redirect("/");
});

app.get("/login",(req,res)=>{
  res.render("login.ejs");
});

app.get("/signup",(req,res)=>{
  res.render("signup.ejs");
});

app.post("/signup", async (req,res)=>{
  try{
    await axios.post(`${API_URL}/auth/register`,{
      email : req.body.email,
      password: req.body.password,
    });
    res.redirect("/login");
  }
  catch(err){
    res.status(500).json({error : "error registering"});
  }
});

app.post("/login", async(req,res)=>{
  try{
    const response = await axios.post(`${API_URL}/auth/login`,{
      email : req.body.email,
      password: req.body.password,
    });
    const token = response.data.token;
    req.session.token = token;//storing token in session or cookie
    res.redirect("/");
  }
  catch(err){
    res.status(401).json({error : "invalid credentials"});
  }
});

app.post("/logout", async(req,res)=>{
  req.session.destroy(()=>{
    res.redirect("/login");
  });
});

app.get("/profile", (req,res)=>{
  res.render("profile.ejs");
})


export default app;


if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
