"use client"
import axios from "axios"
import Link from "next/link"
import toast , {Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Profile() {
    const router = useRouter();
    const logout = async ( ) => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful", {duration: 4000});
            router.push("/login");
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
            <h1>Profile</h1>
            <button className="border border-gray-300 p-2 text-white cursor-pointer"
            onClick={logout}
            >
                logout
            </button>
            <Toaster />
        </div>
    )
}