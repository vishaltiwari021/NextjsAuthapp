import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextResponse,NextRequest} from "next/server";
import User from "@/models/userModels.js";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }
        return NextResponse.json({data: user, message:"User found"},{status:200});

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}

