import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        jwt.verify(token, process.env.TOKEN_SECRET!);
        const decoded = jwt.decode(token);
        return decoded;

    } catch (error:any) {
        throw new Error(error.message);
    }
}