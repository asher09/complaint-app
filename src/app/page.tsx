"use client";

import { useState } from "react";
import { Button, Input } from './components/InputWButton';
import axios from 'axios';

export default function ComplaintDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Product");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

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
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to submit complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Complaint Submission</h1>
      <div className="max-w-md mx-auto border-1 border-[#a9e084] shadow shadow-gray p-6 rounded space-y-4">
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
        <Button
          buttonText="Submit"
          onButtonClick={handleSubmit}
        />
        {message && (
          <div className="text-center text-sm mt-4">{message}</div>
        )}
      </div>
    </div>
  );
}
