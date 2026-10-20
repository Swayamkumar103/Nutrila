import { NextResponse } from "next/server";

export async function POST(){
    try{
        const response = NextResponse.json(
            {message: "Logged out Succussfully"},
            {status:200},
        )

        // crear the jwt cookies
        response.cookies.set("token","",{
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            path:"/",
            expires: new Date(0),
        });
        return response;
    } catch(error){
        console.error("Logout Error: ",error);
        return NextResponse.json(
            {message:"Logout Failed"},
            {status:500},
        )
    }
}