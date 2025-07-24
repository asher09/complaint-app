"use client";
import {Input, Button} from "../../components/InputWButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function AdminSigninPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const Click = async () => {
        setMsg("");
        try {
            const res = await axios.post("/api/admin/login", { email, password });
            const token = res.data.token;
            if(token) {
                localStorage.setItem("adminToken",token)
                setMsg("Signin successful!");
                router.push('/admin/dashboard');   
            } else {
                setMsg("User not Exists")
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMsg(error.response?.data?.error || "Signin failed!, Please try Again");
            } else {
                setMsg("Signin failed!, Please try Again");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#171717]">
            <div className="max-w-md w-full shadow-md sm:rounded-xl bg-[#111111] p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <Input 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Input 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"

                />
                <div className="justify-center flex items-center gap-4">
                    <Button 
                        buttonText="Sign-In"
                        onButtonClick={Click}
                    />
                    <Link href="/admin/signup">
                        <p className="text-[#909090] cursor-pointer hover:underline">Dont have an Account?</p>
                    </Link>
                </div>
                {msg && <div className="text-center text-sm mt-4">{msg}</div>}
            </div>
           
        </div>
    );
}