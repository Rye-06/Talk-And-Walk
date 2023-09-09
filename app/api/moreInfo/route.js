import connectDB from "@/app/lib/mongodb";
import Register from "@/app/models/register";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const {email, age, interests } = await req.json();

  try {
    await connectDB();
    
    const filterAge = { email: email };
    const updateAge = { age: age };

    const filterInt = { email: email };
    const updateInt = { interests: interests };
    
    await Register.findOneAndUpdate(filterAge, updateAge);
    await Register.findOneAndUpdate(filterInt, updateInt);

    const check = await Register.findOne({email:email}) 

    return NextResponse.json({
    msg: ["Added extra information."],
    age: [check.age],
    interests: [JSON.stringify(check.interests)],
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