"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

type Complaint = {
  _id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
};

const statusOptions = ["Pending", "In Progress", "Resolved"];

export default function AdminDashboardUI() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [status, setStatus] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    axios.get("/api/complaints")
      .then(res => setComplaints(res.data))
      .catch(() => setComplaints([]));
  }, []);

  const handleStatusChange = (id: string, value: string) => {
    setStatus(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdateAll = async () => {
    await Promise.all(
      Object.entries(status).map(([id, newStatus]) =>
        axios.put(`/api/complaints/${id}`, { status: newStatus })
      )
    );
    setComplaints(prev =>
      prev.map(c =>
        status[c._id] ? { ...c, status: status[c._id] } : c
      )
    );
    setStatus({});
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/complaints/${id}`);
    setComplaints(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#171717] p-2 sm:p-6 text-white">
      <div className="p-2 sm:p-6 max-w-full sm:max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Complaints</h1>
        <div className="mb-2 sm:mb-4 flex flex-col sm:flex-row justify-start gap-2">
          <button
            className="bg-[#303030] text-[#a9e084] font-medium w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 cursor-pointer rounded-[7px] transition hover:border-1 hover:text-[#303030] hover:bg-[#a9e084]"
            onClick={handleUpdateAll}
            disabled={Object.keys(status).length === 0}
          >
            Update
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <table className="min-w-[600px] sm:w-full text-xs sm:text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-[#080808] text-white">
              <tr>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Title</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Category</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Priority</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Date Submitted</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Status</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c._id} className="bg-[#111111] hover:bg-[#000808]">
                  <td className="px-2 sm:px-6 py-2 sm:py-4 font-medium text-white whitespace-nowrap break-all">{c.title}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 break-all">{c.category}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 break-all">{c.priority}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 break-all">{new Date(c.dateSubmitted).toLocaleString()}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">
                    <select
                      value={status[c._id] ?? c.status}
                      onChange={e => handleStatusChange(c._id, e.target.value)}
                      className="bg-[#111111] p-1 sm:p-2 rounded w-full"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4">
                    <button
                      className="text-[#a9e084] hover:text-[#709657] cursor-pointer text-xs sm:text-sm"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
