"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const[verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async () =>{
        try {
            await axios.post("/api/users/verifyEmail", {token});
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data.message);
        }
}
    useEffect(() => {
        const urlToken =  new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
        
    }, []);

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);

    return (
        <div className="container flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            <h3 className="text-lg mt-4">Please wait while we verify your email address.</h3>
            {verified && <p className="text-green-500 mt-4">Email verified successfully! You can now <Link href="/login" className="text-blue-500 underline">login</Link>.</p>}
            {error && <p className="text-red-500 mt-4">Failed to verify email. Please try again.</p>}
            <p>Verifying your email...</p>
        </div>
    );
}