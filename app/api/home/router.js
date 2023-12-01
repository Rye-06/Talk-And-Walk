import connectDB from "@/app/lib/mongodb";
import Register from "@/app/models/register";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { } = await req.json();

  try {
    await connectDB();
    counter = length of number of objects


    }

    const check = await Register.find().forEach(
        function(check) { check.people[0][0] = 3 }
    );


    return NextResponse.json({
        msg: ["User logged in sucessfully!"],
        people: [check.people]
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