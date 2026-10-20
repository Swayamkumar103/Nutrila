import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import ProfilePage from "../Components/Profilepage";

export default async function Page() {
    // Read the authentication cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Redirect unauthenticated users
    if (!token) {
        console.log("Token not found");
        redirect("/login");
    }

    let decodedUser;

    try {
        // Verify the JWT token
        decodedUser = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch (error) {
        // Redirect if the token is invalid or expired
        redirect("/login");
    }

    // Pass user information to the profile component
    const user = {
        name: decodedUser.name,
        email: decodedUser.email,
    };

    return <ProfilePage user={user} />;
}