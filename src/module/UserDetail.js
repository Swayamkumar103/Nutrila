import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    height: {
      type: Number, // Height in centimetres
      required: true,
      min: 50,
      max: 300,
    },

    weight: {
      type: Number, // Weight in kilograms
      required: true,
      min: 20,
      max: 500,
    },

    activityLevel: {
      type: String,
      required: true,
      enum: [
        "sedentary",
        "lightly_active",
        "moderately_active",
        "very_active",
        "extra_active",
      ],
    },
    bmr : {
      type : Number,
      required : true
    },
    maintenanceCalories:{
      type : Number,
      required : true,
    },
  },
  {
    timestamps: true,
  },
);

const UserDetail =
  mongoose.models.UserDetail || mongoose.model("UserDetail", UserDetailSchema);

export default UserDetail;
