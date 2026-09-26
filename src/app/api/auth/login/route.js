import connectDB from "@/lib/mongodb";
import User from "@/module/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Create response
        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            },
            { status: 200 }
        );

        // Store JWT in HttpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}