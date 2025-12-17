import dbConnect from "@/lib/dbConnect"
import User from "@/models/User";
import { NextResponse } from "next/server"

export async function POST(req){
    try {
        await dbConnect()
        
        const {name, email, phone, password} = await req.json();
        if(!name || !email || !password){
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400})
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({success: false, message: "User already exists"}, {status: 400})
        }

        const newUser = new User({name, email, phone, password})
        await newUser.save()

        return NextResponse.json({
            success: true,
            message: "user registered successfully"
        }, {status: 201})
        
    } catch (error) {
        console.error("error signing up", error)
        return NextResponse.json({success: false, message: "error signing up"}, {status: 500})
    }
}