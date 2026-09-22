import connectDB from "@/lib/mongodb";
import User from "@/module/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
        await connectDB();
        const {email,password} = await request.json();
        if(!email || !password){
            return Response.json(
                { message : "Email and password are required"},
                {status:400}
            )
        }
        const user = await User.findOne({
            email : email.toLowerCase()
        })
        if(!user){
            return Response.json(
                {message:"Invalid user id and password"},
                {status:401}
            )
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )
        if (!isPasswordCorrect) {
            return Response.json(
                { message: "Invalid email or password" },
                { status: 401 }
            )
        }
        // Generate jwt token
        // const token = jwt.sign(
        //     {
        //         id:user._id,
        //         email:user.email,
        //         name:user.name,
        //     },
        //     process.env.JWT_SECRET,
        //     {expiresIn:"7d"}
        // );
        // cookies
        // const response = NextResponse.json({
        //     message:"Login succesful",
        //     user:{
        //         id:user._id,
        //         name:user.name,
        //         email:user.email,
        //     },
        // });
        // response.cookies.set("token",token,{
        //     httpOnly:true,
        //     secure:process.env.NODE_ENV==="production",
        //     sameSite:"lax",
        //     path:"/",
        //     maxAge: 60*60*24*7,
        // }); // not completed 
        return Response.json(
            {
                message:"Login Succesfull",
                 user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                // token,
            },
            {status:200}
        )
    } catch(error){
        console.error("Login Error: ",error);
        return Response.json(
            {message:"Something went wrong"},
            {status: 500}
        );
    }
}