"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast , {Toaster} from "react-hot-toast"
import Image from "next/image"
import { Inter } from "next/font/google"


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
            toast.success("Successfully created your account", {duration: 4000});
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error("Signup failed, User already exists", {duration: 4000});
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
        <div className="flex flex-row items-center justify-center gap-4 min-h-screen h-screen w-full p-4 max-w-screen-2xl 2xl:mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2 w-full lg:w-2/5 max-w-[400px]">
                <div className="flex flex-col items-center justify-center mb-10">
                    <Image src="/images/logo.png" alt="logo" width={60} height={60} className="mb-10" />
                    <h1 className="font-semibold text-white text-2xl">{loading ? "processing" : "Create an account" }</h1>
                    <p className="text-gray-400 text-center text-sm">Sign up now and unlock exclusive access!</p>
                </div>
                <div className="flex flex-col items-start justify-between w-full">
                    <label htmlFor="username" className="capitalize text-sm">username <span className="text-red-500">*</span></label>
                    <input 
                        className="p-2 text-white w-full bg-input"
                        type="text"
                        id="username"
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Username"
                    />
                </div>
                <div className="flex flex-col items-start justify-between w-full">
                    <label htmlFor="email" className="capitalize text-sm">email <span className="text-red-500">*</span></label>
                    <input 
                        className="p-2 text-white w-full bg-input"
                        type="email"
                        id="email"
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="email"
                    />
                </div>
                <div className="flex flex-col items-start justify-between w-full">
                    <label htmlFor="password" className="capitalize text-sm">password <span className="text-red-500">*</span></label>
                    <input 
                        className="p-2 text-white w-full bg-input"
                        type="password"
                        id="password"
                        value={user.password} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                    />
                </div>
                <button 
                    className={`p-2 w-full !mt-10 !mb-5 rounded-lg font-semibold ${buttonDisabled ? "cursor-not-allowed bg-[#FF004D] text-white" : "cursor-pointer bg-[#ADFF00] text-[#22310F]"}`} 
                    onClick={onSignUp}
                    disabled={buttonDisabled}
                >
                    Sign up
                </button>
                <Toaster />
                <p className="text-white">
                    Already have an account?
                    <Link href="/login" className="underline px-2 text-[#ADFF00]">Login</Link>
                </p>
            </div>
            <div className="bg-signup h-full hidden sm:flex lg:w-3/5 bg-center bg-cover bg-no-repeat "></div>
        </div>
    )
}