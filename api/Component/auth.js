import client from '../db.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export let registerUser = async (req,res) => {
    let q = "SELECT * FROM users WHERE email = $1 OR name = $2";
    client.query(q,[req.body.email,req.body.name],(err, data) => {
        if (err) return res.json(err);
        if (data.rowCount > 0) {    
            return res.status(409).json("User already exsist!");
        }

        // hashing password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        
        //inserting to db

        q = "INSERT INTO  users(email,name,password)  values ($1,$2,$3) "
        client.query(q,[req.body.email,req.body.name,hash],(err,data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created successfuly!");
        });
 
    });

}

export let userLogin = async (req,res) => {

    console.log("try to Login");

    let q = "SELECT * FROM users WHERE email = $1 OR name = $1";
    client.query(q,[req.body.email],(err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);}
        
        //check if username or email is there
        
        if (data.rowCount === 0) {
            console.log('does not exsist');    
            return res.status(409).json("Invalid password or username!");
        }
        
        //compare passwords 

        bcrypt.compare(req.body.password, data.rows[0].password, (err, result) => {
            if (err) {
                return res.status(500).json("Error during password comparison.");
            }
            if (result) {
                let {password ,...others} = data.rows[0];
                const token = jwt.sign({id: data.rows[0].id},"key")
                return res.cookie("login_token",token, { 
                    httpOnly: true}).status(200).json(others);
            } else {
                return res.status(401).json("Invalid password or username!");
            }
        });

    });

}

export let changePassword = () => {

}

export let userLogout = (req,res) => {
    console.log("loggingout");
    return res.clearCookie("login_token", { 
        sameSite: "none", secure:true}).status(200).json("User has been logged out.");
}