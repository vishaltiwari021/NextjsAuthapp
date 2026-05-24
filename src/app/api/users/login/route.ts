import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        // Check if the user exists
        const user  = await User.findOne({email});
        if(!user){
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }
        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }
    //create token data
        const tokenData = {
            _id: user._id,
            email: user.email,
            username: user.username
        }
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" }); 
    const response = NextResponse.json({message: "Login Successful", success:true});
    response.cookies.set("token", token, { httpOnly: true});
    return response;
        
    } catch (error :any) {
        console.log("Login Failed", error.message);
        return NextResponse.json({ error: "Login Failed" }, { status: 500 });
    }
}