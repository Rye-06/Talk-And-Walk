import connectDB from "@/app/lib/mongodb";
import Register from "@/app/models/register";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    await connectDB();
    await Register.create({ name, email, password });

    return NextResponse.json({
      msg: ["User registered sucessfully!"],
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
      return NextResponse.json({ msg: ["User unable to register."] });
    }
  }
}