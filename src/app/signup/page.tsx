"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function Signup() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
            
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
            <h1>{loading ? "processing" : "signup" }</h1>
            <hr />
            <div className="flex items-center justify-between w-1/3">
                <label htmlFor="username">username</label>
                <input 
                    className="border border-gray-300 p-2 text-black"
                    type="text"
                    id="username"
                    value={user.username} 
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                />
            </div>
            <div className="flex items-center justify-between w-1/3">
                <label htmlFor="email">email</label>
                <input 
                    className="border border-gray-300 p-2 text-black"
                    type="email"
                    id="email"
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
            </div>
            <div className="flex items-center justify-between w-1/3">
                <label htmlFor="password">password</label>
                <input 
                    className="border border-gray-300 p-2 text-black"
                    type="password"
                    id="password"
                    value={user.password} 
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                />
            </div>
            <button 
                className={`border border-gray-300 p-2 text-white ${buttonDisabled ? "cursor-not-allowed border-red-700 text-red-700" : "cursor-pointer"}`} 
                onClick={onSignUp}
            >
                {buttonDisabled ? "please provide complete details" : "sign up"}
            </button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}