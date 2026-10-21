import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import UserDetail from "@/models/UserDetail";

const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

export async function POST(request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Get JWT token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Please log in first" },
        { status: 401 },
      );
    }

    // 3. Verify JWT
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Adjust "id" if your login API uses a different JWT payload field.
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID not found in token" },
        { status: 401 },
      );
    }

    // 4. Read request body
    const body = await request.json();

    const { age, gender, height, weight, activityLevel } = body;

    // 5. Validate required fields
    if (
      age === undefined ||
      gender === undefined ||
      height === undefined ||
      weight === undefined ||
      activityLevel === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Age, gender, height, weight, and activity level are required",
        },
        { status: 400 },
      );
    }

    // 6. Validate numeric values
    const parsedAge = Number(age);
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (
      !Number.isFinite(parsedAge) ||
      !Number.isFinite(parsedHeight) ||
      !Number.isFinite(parsedWeight) ||
      !Number.isInteger(parsedAge) ||
      parsedAge < 18 ||
      parsedAge > 120 ||
      parsedHeight < 50 ||
      parsedHeight > 300 ||
      parsedWeight < 20 ||
      parsedWeight > 500
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid age, height, and weight",
        },
        { status: 400 },
      );
    }

    // 7. Validate gender
    const normalizedGender = String(gender).trim().toLowerCase();

    if (!["male", "female"].includes(normalizedGender)) {
      return NextResponse.json(
        { success: false, message: "Gender must be male or female" },
        { status: 400 },
      );
    }

    // 8. Validate activity level
    const normalizedActivity = String(activityLevel).trim().toLowerCase();

    if (!Object.hasOwn(activityMultipliers, normalizedActivity)) {
      return NextResponse.json(
        { success: false, message: "Invalid activity level" },
        { status: 400 },
      );
    }

    // 9. Calculate BMR using Mifflin-St Jeor equation
    const bmr =
      normalizedGender === "male"
        ? 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5
        : 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;

    // 10. Calculate maintenance calories (TDEE)
    const maintenanceCalories = bmr * activityMultipliers[normalizedActivity];

    // 11. Save or update the user's profile
    const userDetail = await UserDetail.findOneAndUpdate(
      { userId },
      {
        $set: {
          age: parsedAge,
          gender: normalizedGender,
          height: parsedHeight,
          weight: parsedWeight,
          activityLevel: normalizedActivity,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    // 12. Return the result
    return NextResponse.json(
      {
        success: true,
        message: "User details saved successfully",
        data: {
          userId: userDetail.userId,
          age: userDetail.age,
          gender: userDetail.gender,
          height: userDetail.height,
          weight: userDetail.weight,
          activityLevel: userDetail.activityLevel,
          bmr: Math.round(bmr),
          maintenanceCalories: Math.round(maintenanceCalories),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("User detail API error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// Get api

export async function GET() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please log in first",
        },
        { status: 401 }
      );
    }

    // 3. Verify JWT token
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    // 4. Extract user ID from token
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found in token",
        },
        { status: 401 }
      );
    }

    // 5. Find the user's profile
    const userDetail = await UserDetail.findOne({ userId })
      .select("age gender height weight activityLevel -_id")
      .lean();

    if (!userDetail) {
      return NextResponse.json(
        {
          success: false,
          message: "User profile not found",
        },
        { status: 404 }
      );
    }

    // 6. Return user details
    return NextResponse.json(
      {
        success: true,
        message: "User details fetched successfully",
        data: userDetail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET User Details Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}