"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



//user give me all this information.
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email:"",
    password:"",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
// method does all signup logic - i will send this user information to the backend and create a new user in the database and then redirect the user to the login page
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error:any) {
      console.log("login failed", error.message);
      toast.error("Login Failed")
      
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(() =>{
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Login"}</h1>
      <label htmlFor="email">email</label>
      <input
      className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none "
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
      className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none "
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onLogin} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:cursor-pointer">{buttonDisabled ? "No Login" : "Login"}</button>
      <Link href="/signup" className="mt-4 text-blue-500 hover:underline">
        Do not have an account? Signup
      </Link>
    </div>
  );
}
