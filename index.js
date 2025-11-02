// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import ejs from 'ejs';

// const app = express();
// const port = 3000;

// app.set('view engine','ejs');
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.set('views', path.join(__dirname, 'views'));



// const storage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null,"public/uploads");
//   },
//   filename:(req,file,cb)=>{
//     cb(null,Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({storage:storage});

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
// ]

// app.get('/',(req,res)=>{
//   res.render('index.ejs',{posts:posts});
// });

// app.get('/posts/:id',(req,res)=>{
//   const id = parseInt(req.params.id);
//   const post = posts.find(p => p.id === id);

//   if(!post){
//     return res.status(404).render('404',{message:"Post not found"});
//   }

//   res.render('post.ejs',{post:post});
// });



// app.get('/compose',(req,res)=>{
//   res.render('compose');
// });


// // handle form submit
// app.post('/compose',upload.single('image'),(req, res) => {
//   // basic validation
//   const { title, author, content } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : null;
//   if (!title || !author || !content) {
//     // Ideally re-render with an error; for simplicity:

  

//     return res.status(400).send('Title, author and content are required');
//   }
   
//   // create new id (simple numeric increment)
//   const newId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  
//   // create new post object
//   const newPost = {
//     id: newId,
//     title: title.trim(),
//     author: author.trim(),
//     date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//     image, // allow optional image URL
//     content: content.trim()
//   };

//   // add to posts array (in-memory)
//   posts.unshift(newPost); // add to top so it appears first on homepage

//   // redirect to the new post page OR to home
//   // Option A: show the single post
//   res.redirect(`/posts/${newId}`);

//   // Option B: redirect to homepage
//   // res.redirect('/');
// });







// app.listen(port,()=>{
//   console.log(`Server is running on http://localhost:${port}`);
// });
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import {fileURLToPath} from 'url';
//for file uploads
import multer from 'multer';


//for put opeartion
import methodOverride from 'method-override';



const app = express();
const port = 3000;



app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views',path.join(__dirname,'views'));

//multer setup
const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,'public/uploads');
  },

  filename : (req,file,cb)=>{
    cb(null, Date.now()+ path.extname(file.originalname));
  }
});

const upload = multer({storage:storage});

//for put opeartion
app.use(methodOverride('_method'));

const posts = [
  {
    id:1,
    title:"Expalining how to balance life and work as a developer",
    author:"John Doe",
    date:"2025-10-12",
    content:"Balancing life and work as a developer can be challenging. Here are some tips to help you manage your time effectively...",
    image:"/images/post1.jpeg"
  },
  {
    id:2,
    title:"how I learned martial arts in 6 months",
    author:"Jane Smith",
    date:"2025-11-05",
    content:"Learning martial arts requires dedication and practice. In this article, I will share my journey and the techniques that helped me improve quickly...",
    image:"/images/post2.jpeg"
  },
  {
    id:3,
    title:"Top 10 travel destinations for developers",
    author:"Alice Johnson",
    date:"2025-09-20",
    content:"As a developer, finding the right travel destinations can enhance your creativity and productivity. Here are my top 10 picks for places to visit...",
    image:"/images/post3.jpg"
  },
  {
    id:4,
    title:"The future of AI in web development",
    author:"Bob Brown",
    date:"2025-12-01",
    content:"Artificial Intelligence is transforming the web development landscape. In this article, we will explore the potential applications of AI and how it can benefit developers...",
    image:"/images/post4.jpg"
  },
  {
    id:5,
    title:"Healthy habits for remote developers",
    author:"Emily White",
    date:"2025-08-15",
    content:"Working remotely as a developer can lead to unhealthy habits. Here are some tips to maintain a healthy lifestyle while working from home...",
    image:"/images/post5.jpg"
  },
  {
    id:6,
    title:"how to become a morning person as night owls",
    author:"David Green",
    date:"2025-07-30",
    content:"Becoming a morning person can be challenging for night owls. In this article, I will share strategies that helped me adjust my sleep schedule and embrace the mornings...",
    image:"/images/post6.jpg"
  },
  {
    id:7,
    title:"My day as an immigrant job holder",
    author:"Bob Brown",
    date:"2025-06-18",
    content:"Being an immigrant job holder comes with its own set of challenges and experiences. In this article, I will share a typical day in my life and how I navigate the professional landscape...",
    image:"/images/post7.jpg"
  },
  {
    id:8,
    title:"The impact of open source on modern software development",
    author:"Alice Johnson",
    date:"2025-05-22",
    content:"Open source has revolutionized the software development industry. In this article, we will discuss the benefits of open source and how it has shaped modern development practices...",
    image:"/images/post8.jpg"
  },
  {
    id:9,
    title:"Why u should start a home garden if you live in a city",
    author:"Charlie Black",
    date:"2025-04-10",
    content:"Starting a home garden in the city can bring numerous benefits, from improving mental health to providing fresh produce. Here are some tips to help you get started...",
    image:"/images/post9.jpg"
  },
  {
    id:10,
    title:"Tips if you are having a pet cat for the first time",
    author:"Samantha Green",
    date:"2025-03-05",
    content:"Getting a pet cat for the first time can be both exciting and overwhelming. In this article, I will share some essential tips to help you care for your new feline friend...",
    image:"/images/post10.jpg"
  }
]

//READ
app.get('/',(req,res)=>{
  res.render('index',{posts:posts});
});

app.get('/posts/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const post = posts.find(p=>id == p.id);
  if(!post){
    return res.status(404).render('404',{message:"post not found"});
  }
  res.render('post',{post:post});
});



//CREATE
app.get('/compose',(req,res)=>{
  res.render('compose');
});

app.post('/compose',upload.single('image'),(req,res)=>{
  const {title,author,content} = req.body;
  const image = req.file? `/uploads/${req.file.filename}`:null;

  if(!title || !author || !content){
    return res.status(404).render('404',{message:"title, author , content must be there"});
  };

  const newId = posts.length?Math.max(...posts.map(p=>p.id))+1 :1;

  const newPost = {
    id:newId,
    title:title,
    author:author,
    date: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}),
    content:content,
    image,

  };

  posts.unshift(newPost);

  res.redirect(`/posts/${newPost.id}`);

});

//UPDATE
app.get('/posts/:id/edit',(req,res)=>{
  const id = parseInt(req.params.id);
  const post = posts.find(p=>id === p.id);
  if(!post){
    return res.status(404).render('404',{message:"post not found"});
  }
  res.render('edit',{post:post});
});

//
app.put('/posts/:id',upload.single('image'),(req,res)=>{
  const id = parseInt(req.params.id);
  const { title,author,content } = req.body;
  const image = req.file?`/uploads/${req.file.filename}`:null;




  //replacing in array
  const postIWant = posts.find(p=>p.id === id);
    if(!postIWant){
    return res.status(404).render('404',{message:"post not found"});
  }
  postIWant.content = content || postIWant.content;
  if(image){
    postIWant.image = image;
  }

  const index = posts.findIndex(p=>p.id === id);
  if(index != -1){
    posts[index] = postIWant;
  }

  //redirecting
  res.redirect(`/posts/${id}`);

  
});





//DELETE
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).render('404', { message: "Post not found" });
  }

  posts.splice(index, 1); // remove from array
  res.redirect('/'); // go back to homepage
});



export default app;


if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
