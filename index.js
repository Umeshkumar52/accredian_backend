import express from "express";
import db from "./dbconnect.js";
import {createServer} from 'node:http'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app=express()
const server=createServer(app)
app.use(cors({
  origin:"https://accredian-frontend-f20d.onrender.com",
  credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.post('/referral',async(req,res)=>{
  console.log(req.body);  
  const{Name,ContactNo,FriendsName,FriendsContactNo}=req.body;
  const sql=`insert into refereelist (Name,ContactNo,FriendsName,FriendsContactNo) VALUES (?,?,?,?)`;
  db.query(sql,[Name,ContactNo,FriendsName,FriendsContactNo],(Error,result)=>{
    if(Error){
      return res.status(501).json({
        success:false,
        message:Error
      })
    }
   return res.status(200).json({
    success:true,
    message:result
   })
})
})
app.get('/referee',async(req,res)=>{
    const refereeList=db.query(`SELECT *FROM refereelist`,(err,result)=>{
      if(err){
         res.status(501).json({
          success:false,
          message:err
        })
        }else{
          res.status(200).json({
            success:true,
            message:result
          })
        }

    })
})
server.listen(5002)
