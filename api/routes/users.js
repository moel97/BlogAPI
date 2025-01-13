import express from "express"

let router = express.Router();

router.get("/",(req,res)=>{
res.json("hello users");
});

export default router