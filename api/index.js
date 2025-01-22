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
    origin: true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

API.use(cors(corsOptions))
API.use(express.json())
API.use(cookieParser())

API.get('/photo/:imageName', (req, res) => {
  const photoPath = path.join( req.params.imageName); // Adjust path as needed
  res.sendFile(photoPath);
});

// Multer handling photos upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })


API.post('/api/upload',upload.single('photo'), function (req, res) {
  console.log("tring to upload photo");
try {
    const fileUrl = `${req.protocol}://${req.get('host')}/photo/${req.file.filename}`;
    res.status(200).json(fileUrl);
  } catch (error) {
    console.log("failed to upload photo");
    res.status(500).json({ message: 'Error uploading photo', error });
  }
  })


API.use("/api/posts",postRouter)
API.use("/api/auth",authRouter)
API.use("/api/users",usersRouter)



API.listen(port, () => {console.log("API is starting");})


API.get("/",(req,res)=>{
    res.json("it works!")
});

