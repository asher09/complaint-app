"use client";
import {Input, Button} from "../../components/InputWButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


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
        } catch (error: any) {
            setMsg(error.response?.data?.error || "Signin failed!, Please try Again");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#171717]">
            <div className="max-w-md w-full shadow-md sm:rounded-xl bg-[#111111] p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <Input 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <Input 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"

                />
                <div className="justify-center flex" >
                    <Button 
                        buttonText="Sign-In"
                        onButtonClick={Click}
                    />
                </div>
                {msg && <div className="text-center text-sm mt-4">
                            {msg}
                        </div>}
            </div>
           
        </div>
    );
}