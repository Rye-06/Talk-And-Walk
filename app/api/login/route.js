import connectDB from "@/app/lib/mongodb";
import Register from "@/app/models/register";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
const { email, password } = await req.json();

try {
    await connectDB();
    const check = await Register.findOne({email:email, password: password}) 

    if (check) {
        return NextResponse.json({
        msg: ["User logged in sucessfully!"],
        name: [JSON.stringify(check.name)],
        age: [check.age],
        interests: [check.interests],
        success: true,
        });
    }
    else{
        return NextResponse.json({
        msg: ["User not found."]
        });
    }
} catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
    let errorList = [];
    for (let e in error.errors) {
        errorList.push(error.errors[e].message);
    }
    console.log(errorList);
    return NextResponse.json({ msg: errorList });
    } else {
    return NextResponse.json({ msg: ["User unable to login."] });
    }
}
}