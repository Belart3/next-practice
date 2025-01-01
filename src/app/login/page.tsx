"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function Login() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            toast.success("Login successful")
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Failed", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
            <h1>{loading ? "processing" : "login"}</h1>
            <hr />
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
                className="bg-blue-500 text-white p-2 rounded" 
                onClick={onLogin}
            >
                Login
            </button>
            <Link href="/signup">Visit signup Page</Link>
        </div>
    )
}