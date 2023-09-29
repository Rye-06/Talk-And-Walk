import connectDB from "@/app/lib/mongodb";
import Register from "@/app/models/register";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const {email, age, interests, lat, long } = await req.json();

  try {
    await connectDB();
    
    const filter = { email: email };
    
    const updateAge = { age: age };
    const updateInt = { interests: interests };

    const updateLat = { lat: lat };
    const updateLong = { long: long };
    
    await Register.findOneAndUpdate(filter, updateAge);
    await Register.findOneAndUpdate(filter, updateInt);

    await Register.findOneAndUpdate(filter, updateLat);
    await Register.findOneAndUpdate(filter, updateLong);

    return NextResponse.json({
    msg: ["Added extra information."],
    success: true,
    });

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to add extra information."] });
    }
  }
}