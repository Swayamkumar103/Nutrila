import mongoose from "mongoose";

const MealsSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        index : true,
    },
    foodName: {
      type: String,
      required: true,
      trim: true,
    },
    mealType: {
        type : String,
        enum : ["Breakfast", "Lunch", "Dinner", "Snack"],
        required: true,
    },
    quantity:{
        type : Number,
        required : true,
        min : 0,
    },
    calories: {
        type : Number,
        required : true,
        min : 0,
    },
    protein : {
        type : Number,
        default : 0,
        min : 0,
    },
    carbs : {
        type : Number,
        default : 0,
        min : 0,
    },
    fats : {
        type : Number,
        default : 0,
        min : 0,
    },
    date : {
        type : Date,
        default : Date.now,
        index : true,
    },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.models.Meal || mongoose.model("Meal", MealsSchema);

export default Meal;