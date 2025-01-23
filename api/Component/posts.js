import client from '../db.js'
import jwt from 'jsonwebtoken'

export let addpost = (req,res)=>{
    let q = "INSERT INTO  posts (title,body,postingdate,userid,genre,photo)  values ($1,$2,$3,$4,$5,$6)";
    client.query(q,[req.body.title,req.body.body,req.body.postingdate,req.body.userid,req.body.genre,req.body.photo], (err,data) =>{
        if (err) return res.json(err);
        return res.status(200).json("post has been created successfuly!");       
    });
} ;

        
export let getHomePosts = (req,res)=>{
    
    let q = req.query.cat?"SELECT * FROM posts WHERE LOWER(genre) = LOWER($1) LIMIT 8" : "SELECT * FROM posts LIMIT 16" ;
    client.query(q,req.query.cat&&[req.query.cat],(err, data) => {
        if (err) return res.send(err);
            
        return res.status(200).json(data.rows);
        });
} ;


export let deletePost = (req,res)=>{
    
    const token = req.cookies.login_token
    if (!token) {return res.status(401).json("Not authenticated")}
    
    jwt.verify(token,"key",(err,userInfo) => {
        
        if (err) return res.status(403).json("token is not valid"); 
        
    let q = "DELETE FROM posts WHERE id = $1 and userid = $2";
    client.query(q,[req.params.id,userInfo.id],(err, data) => {
        if (err) return res.status(403).json("err: you can only delete your posts"); 
        if (data.rowCount === 0) return res.status(403).json("already deleted: you can only delete your posts");
        
        
        return res.status(200).json("post was deleted successfuly");
        });
    
    });
    
    
    
} ;


export let getPost = (req,res)=>{
    let q =`
        SELECT 
            u.name,
            u.photo AS uPhoto,
            p.body,
            p.title,
            p.photo,
            p.postingdate AS postingdate,
            p.genre 
        FROM users u 
        JOIN posts p 
        ON u.id = p.userid 
        WHERE p.id = $1
    `; 
    client.query(q,[req.params.id],(err, data) => {
        if (err) {
            console.log(err);
            
            return res.send(err)}; 
        if (data.rows.length === 0) {
            console.log("there is no such post");
            return res.status(404).json("there is no such post");
        }
        console.log("we got your post");
        return res.status(200).json(data.rows);
        });
    } ;


export let updatePost = (req,res)=>{
    
    const q="UPDATE posts SET title = $1, body = $2, postingdate = $3, genre = $4, photo = $5 WHERE id = $6 AND userid = $7;"
    client.query(q,[req.body.title , req.body.body ,req.body.postingdate  ,req.body.genre ,req.body.photo ,req.params.id,req.body.userid], (err,data) =>{
        if (err) {
            console.log(err);
            
            return res.send(err)};    
        return res.status(200).json("post was updated successfuly");
    });
} ;