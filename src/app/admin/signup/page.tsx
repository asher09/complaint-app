"use client";
import { Input, Button } from "../../components/InputWButton";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const Click = async () => {
    setMsg("");
    try {
      await axios.post("/api/admin/signup", { name, email, password });
      setMsg("Signup successful!");
      router.push("/admin/signin");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response?.data?.error || "Signup failed!");
      } else {
        setMsg("Signup failed!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="max-w-md w-full shadow-md sm:rounded-xl bg-[#111111] p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="flex justify-center items-center gap-4">
          <Button buttonText="Sign-Up" onButtonClick={Click} />
          <Link href="/admin/signin">
            <p className="text-[#909090] cursor-pointer hover:underline">
              Already have an account?
            </p>
          </Link>
        </div>
        {msg && (
          <div className="text-center text-sm mt-4">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}