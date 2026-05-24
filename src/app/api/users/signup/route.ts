import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect();


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email,password} = reqBody;
        if(!username || !email || !password){
            return NextResponse.json({message:"Please fill all the fields"}, {status:400})
        }
        //check if user already exists
        const user  = await User.findOne({email});
        if(user){
            return NextResponse.json({message:"User already exists"}, {status:400})
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const newUser  = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return NextResponse.json({message:"User created successfully", success:true, savedUser});


    } catch (error : any) {
        return NextResponse.json({message:"Error in Signup"}, {status:500})
    }
}