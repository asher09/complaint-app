"use client";

import { useState } from "react";
import { Button, Input } from './components/InputWButton';

export default function ComplaintDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Product",
    priority: "Medium",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Click = () => {
        console.log("Button clicked");
    }

  return (
    <div className="min-h-screen bg-[#171717] p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Complaint Submission</h1>

      <div
        className="max-w-md mx-auto border-1 border-[#a9e084] shadow shadow-gray p-6 rounded space-y-4"
      >
        <div>
          <label className="block mb-1 font-whte font-semibold">Complain title</label>
          <Input 
            placeholder="Title"
            onChange={(e) => { console.log("hellowrodl")}} 
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <Input 
            placeholder="Description"
            onChange={(e) => { console.log("hellowrodl")}} 
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
                  name="priority"
                  value={level}
                  checked={formData.priority === level}
                  onChange={handleChange}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <Button
          buttonText="Submit"
          onButtonClick={Click}
        />
      </div>

    </div>
  );
}
