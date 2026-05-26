"use client"
import axios from "axios";
import Link from "next/link"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const logout = async () => {
    try {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
        router.push("/login");

    } catch (error:any) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  }

  const getUserDetails = async() => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    
  }
  return (

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <p>This is the profile page. Only authenticated users can see this.</p>
      <h2 className="rounded bg-green-400 p-3 text-black">
        {data === 'nothing' ? "Nothing" : <Link href ={`/profile/${data}`}> {data} </Link>}</h2>
      <hr />
      <button 
      onClick={logout}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 mt-4 cursor-pointer">
        Logout
        </button>
        <hr />
      <button 
      onClick={getUserDetails}
      className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 mt-4 cursor-pointer">
        Get User Details
        </button>
    </div>

  );
}