import express from 'express'
import cors from 'cors'
import postRouter from "./routes/posts.js"
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import cookieParser from 'cookie-parser'
import multer from 'multer'
const API = express();
const port = 3000;
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

API.use(cors(corsOptions))
API.use(express.json())
API.use(cookieParser())

// Multer handling photos upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './../client/public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })


API.post('/api/upload',upload.single('photo'), function (req, res) {
    const photo = req.file;
    res.status(200).json(photo.filename);
  })


API.use("/api/posts",postRouter)
API.use("/api/auth",authRouter)
API.use("/api/users",usersRouter)



API.listen(port, () => {console.log("API is starting");})


API.get("/",(req,res)=>{
    res.json("it works!")
});

