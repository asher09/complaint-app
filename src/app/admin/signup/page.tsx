"use client";
import {Input, Button} from "../../components/InputWButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminSigninPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const Click = async () => {
        setMsg("");
        try {
            await axios.post("/api/admin/signup", { 
                name, email, password 
            });
            setMsg("Signup successful!");
            router.push('/admin/signin');
        } catch (error: any) {
            setMsg(error.response?.data?.error || "Signup failed!");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#171717]">
            <div className="max-w-md w-full shadow-md sm:rounded-xl bg-[#111111]  p-6 space-y-4">
                <h1 className="text-2xl font-bold text-center">SignUp</h1>
                <Input 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" 
                />
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
                    buttonText="Sign-Up"
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