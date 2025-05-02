import bcrypt from "bcryptjs";
import { db } from "../libs/DB.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

//here we are using async as we are interacting with db

export const register=async (req,res)=>{
    const {name,email,password}=req.body();

    try {
        //check user already exits or not
        const existingUser=await db.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })
        }

        //create a new user
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
            httpsOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!="development",
            maxAge:1000*60*60*24*7//7 days
        })

        res.status(201).json({
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

export const login=async (req,res)=>{}

export const logout=async (req,res)=>{}

export const check=async(req,res)=>{}