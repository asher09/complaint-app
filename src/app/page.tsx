"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from './components/InputWButton';
import axios from 'axios';

export default function ComplaintDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Product");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setMessage("");
    try {
      await axios.post("/api/complaints", {
        title,
        description,
        category,
        priority,
      });
      setMessage("Complaint submitted successfully!");
      setTitle("");
      setDescription("");
      setCategory("Product");
      setPriority("Medium");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || "Failed to submit complaint.");
      } else {
        setMessage("Failed to submit complaint.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Complaint Submission</h1>
      <div className="max-w-md mx-auto shadow-md sm:rounded-xl bg-[#111111] p-6 rounded space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Complain title</label>
          <Input
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <Input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border bg-[#202020] border-[#424647] px-3 py-4 rounded"
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Priority</label>
          <div className="flex gap-4">
            {["Low", "Medium", "High"].map((level) => (
              <label key={level} className="flex items-center gap-1">
                <input
                  className="accent-[#a9e084]"
                  type="radio"
                  value={level}
                  checked={priority === level}
                  onChange={(e) => setPriority(e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
        <Button
          buttonText="Submit"
          onButtonClick={handleSubmit}
        />
        </div>
        {message && (
          <div className="text-center text-sm mt-4">{message}</div>
        )}
        <div className="flex gap-4 justify-center mt-6">
          <button
            className="bg-[#303030] cursor-pointer text-[#a9e084] px-6 py-2 rounded hover:bg-[#a9e084] hover:text-[#303030] transition"
            onClick={() => router.push("/admin/signin")}
          >
            Admin Signin
          </button>
          <button
            className="bg-[#303030] cursor-pointer text-[#a9e084] px-6 py-2 rounded hover:bg-[#a9e084] hover:text-[#303030] transition"
            onClick={() => router.push("/admin/signup")}
          >
            Admin Signup
          </button>
        </div>
      </div>
    </div>
  );
}
