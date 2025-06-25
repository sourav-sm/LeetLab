import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

//here we are using async as we are interacting with db

export const register=async (req,res)=>{
    const {name,email,password}=req.body;

    try {
        //check user already exits or not
        const existingUser=await db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })
        }

        //hashing password
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token=jwt.sign({id:newUser.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            httpOnly:true,
            // sameSite:"strict",
            sameSite:"None",//as frontend on vercel and backend on render
            // secure:process.env.NODE_ENV!="development",
            secure:true,
            maxAge:1000*60*60*24*7//7 days
        })

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })

    } catch (error) {
        console.error("Error creating user: ",error);
        res.status(500).json({
            error:"Error creating user"
        })
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await db.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }

        //checking password
        const matched=await bcrypt.compare(password,user.password);
        if(!matched){
            return res.status(401).json({
                error:"Invalid Credentials"
            })
        }

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            httpOnly:true,
            // sameSite:"strict",
            sameSite:"None",//as frontend on vercel and backend on render
            // secure:process.env.NODE_ENV!="development",
            secure:true,
            maxAge:7*24*60*60*1000//7days
        })

        res.status(200).json({
            success:true,
            message:"user found successfully",
            user:{
                id:user.id,
                email:user.email,
                password:user.password,
                image:user.image,
                role:user.role
            }
        })

    } catch (error) {
        console.log("Error while logging user",error);
        res.status(404).json({
            error:"Error logging user"
        })
    }
}

export const logout=async (req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpsOnly:"true",
            sameSite:"strict",
            secure:process.env.NODE_ENV!="development",
        })

        res.status(200).json({
            success:true,
            message:"user logout successfully"
        })
    } catch (error) {
        console.log("error logging user",error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }
}

export const check=async(req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"user authenticated sucessfully",
            user:req.user
        })
    } catch (error) {
        console.log("error creating user",error);
        res.status(500).json({
            error:"Error creating user"
        })
    }
}