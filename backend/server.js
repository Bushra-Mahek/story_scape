import express from "express";
import cors from "cors";
import postsRoutes from "./routes/posts.routes.js"
import path from "path"
import { fileURLToPath } from "url";



const app = express();
const port = 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/posts",postsRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
console.log(
  "Uploads path:",
  path.join(__dirname, "public", "uploads")
);


app.listen(port,()=>{
    console.log(`server is listening from port ${port}`);
});

