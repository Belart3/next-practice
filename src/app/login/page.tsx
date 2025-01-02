"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
import Image from "next/image"


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
            toast.success("Login successful", {duration: 4000})
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Failed", error)
            toast.error("Login failed, Use Valid Login Credentials", {duration: 4000})
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
        <div className="flex flex-row-reverse items-center justify-center gap-4 min-h-screen h-screen w-full p-4 max-w-screen-2xl 2xl:mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2 w-full lg:w-2/5 max-w-[400px]">
                <div className="flex flex-col items-center justify-center mb-10">
                    <Image src="/images/logo.png" alt="logo" width={60} height={60} className="mb-10" />
                    <h1 className="font-semibold text-white text-2xl">{loading ? "processing" : "Login" }</h1>
                    <p className="text-gray-400 text-center text-sm">Sign in to your account!</p>
                </div>
                <div className="flex flex-col items-start justify-between w-full">
                    <label htmlFor="email" className="capitalize text-sm">email <span className="text-red-500">*</span></label>
                    <input 
                        className="p-2 text-white w-full bg-input"
                        type="email"
                        id="email"
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Email"
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
                        placeholder="Password"
                    />
                </div>
                <button 
                    className={`p-2 w-full !mt-10 !mb-5 rounded-lg font-semibold ${buttonDisabled ? "cursor-not-allowed bg-[#FF004D] text-white" : "cursor-pointer bg-[#ADFF00] text-[#22310F]"}`} 
                    onClick={onLogin}
                    disabled={buttonDisabled}
                >
                    Login
                </button>
                <Toaster />
                <p className="text-white">
                    Don't have an account?
                    <Link href="/signup" className="underline px-2 text-[#ADFF00]">Sign up</Link>
                </p>
            </div>
            <div className="bg-signup h-full hidden sm:flex lg:w-3/5 bg-center bg-cover bg-no-repeat "></div>
        </div>
    )
}