import express from "express"
import { addpost,deletePost,getHomePosts, getPost, updatePost } from "../Component/posts.js";

let router = express.Router();

router.post("/",addpost);


router.get("/",getHomePosts);
router.get("/:id",getPost);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

export default router