import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function getCurrentUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if(!token){
        redirect("/login");
    }
    try{
        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        return decoded;
    } catch(error){
        console.log("Invalid tokent");
        redirect("/login");
    }

}