import { NextResponse } from "next/server";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Meal from "@/module/Meals";

export async function POST(request){
    try{
        await connectDB();
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;
        if(!token){
            return NextResponse.json(
                {message:"Please log in first"},
                {status : 401},
            );
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );
        const {
            foodName,
            mealType,
            quantity,
            calories,
            protine,
            carbs,
            fats,
            date,
        } = await request.json();
        if(
            typeof foodName !=="string" || !foodName.trim()||
            !["Breakfast","Lunch","Dinner","Snack"].includes(mealType)||
            !Number.isFinite(quantity)||
            quantity<=0||
            !Number.isFinite(calories)||
            calories<0
        ) {
            return NextResponse.json(
                {message : "Invalid meal information"},
                {status : 400},
            )
        }

        // save Meal in Database

        const meal = await Meal.create({
            // Get user's ID form the verified token
            userId : decoded.userId,
            foodName : foodName.trim(),
            mealType,quantity,calories,
            protine :protine?? 0,
            carbs : carbs ?? 0,
            fats : fats ?? 0,
            ...(date ? {date:new Date(date)}: {}),
        })
        return NextResponse.json(
            {
                message : "Meal added Succesfully",
                meal,
            },
            {status: 201}
        )

    } catch(error){
        console.error("Add meal error: ",error);
        if(error.name === "JsonWebTokenError"|| error.name ==="TokenExpitedError"){
            return NextResponse.json(
                {message: "Session expired. Please log in again"},
                {status: 401}
            );
        }
        return NextResponse.json(
            {message: "Failed to add meal"},
            {status:500}
        )
    }
}

// export async function POST(request) {
//     try {
//         // Step 1: Connect to MongoDB
//         await connectDB();

//         // Step 2: Get meal data from the request body
//         const {
//             userId,
//             foodName,
//             mealType,
//             quantity,
//             calories,
//             protein,
//             carbs,
//             fats,
//             date,
//         } = await request.json();

//         // Step 3: Validate the required meal information
//         if (
//             !userId ||
//             typeof foodName !== "string" ||
//             !foodName.trim() ||
//             !["Breakfast", "Lunch", "Dinner", "Snack"].includes(mealType) ||
//             !Number.isFinite(quantity) ||
//             quantity <= 0 ||
//             !Number.isFinite(calories) ||
//             calories < 0
//         ) {
//             return NextResponse.json(
//                 { message: "Invalid meal information" },
//                 { status: 400 }
//             );
//         }

//         // Step 4: Save the meal in MongoDB
//         const meal = await Meal.create({
//             userId,
//             foodName: foodName.trim(),
//             mealType,
//             quantity,
//             calories,
//             protein: protein ?? 0,
//             carbs: carbs ?? 0,
//             fats: fats ?? 0,
//             ...(date ? { date: new Date(date) } : {}),
//         });

//         // Step 5: Return the saved meal
//         return NextResponse.json(
//             {
//                 message: "Meal added successfully",
//                 meal,
//             },
//             { status: 201 }
//         );

//     } catch (error) {
//         // Handle database or other unexpected errors
//         console.error("Add meal error:", error);

//         return NextResponse.json(
//             { message: "Failed to add meal" },
//             { status: 500 }
//         );
//     }
// }


export async function GET (request){
    try{
        await connectDB();
        // Get authen cookies
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;
        if(!token){
            return NextResponse.json(
                {message : "Please log in first"},
                {status : 401},
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const meals = await Meal.find({
            userId : decoded.userId
        }).sort({date:-1});
        return NextResponse.json({meals},{status:200});
    } catch(error){
        console.error("Get meals error: ",error);
        if(error.name === "JsonWebTokenError"|| error.name === "TokenExpiredError"){
            return NextResponse.json({message: "Session expired. Please log in again."},{status:401});
        }
        return NextResponse.json(
            {message: "Failed to fetch meals"},
            {status: 500},
        )
    }
}

// export async function GET() {
//     try {
//         // 🟦 Connect to MongoDB
//         await connectDB();

//         // 🟩 Retrieve all meals from the database
//         const meals = await Meal.find({});

//         // 🟢 Return the retrieved meals
//         return NextResponse.json(
//             {
//                 message: "Meals fetched successfully",
//                 meals
//             },
//             { status: 200 }
//         );

//     } catch (error) {
//         // 🟥 Handle errors
//         console.error("Get meals error:", error);

//         return NextResponse.json(
//             { message: "Failed to fetch meals" },
//             { status: 500 }
//         );
//     }
// }