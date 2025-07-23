"use client";

const statusOptions = ["Pending", "In Progress", "Resolved"];
// const priorityOptions = ["Low", "Medium", "High"];

export default function AdminDashboardUI() {

  const Click = () => {
      console.log("Button clicked");
  }

  const complaints = [
    {
      _id: "1",
      title: "Leaky Faucet",
      category: "Maintenance",
      priority: "High",
      dateSubmitted: new Date().toISOString(),
      status: "Pending",
    },
    {
      _id: "2",
      title: "Broken Window",
      category: "Maintenance",
      priority: "Medium",
      dateSubmitted: new Date().toISOString(),
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-[#171717] p-6 text-white">
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Complaints</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-[#080808] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Priority</th>
                <th scope="col" className="px-6 py-3">Date Submitted</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="bg-[#111111]  hover:bg-[#000808]">
                  <td scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{c.title}</td>
                  <td className="px-6 py-4">{c.category}</td>
                  <td className="px-6 py-4">{c.priority}</td>
                  <td className="px-6 py-4">{new Date(c.dateSubmitted).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <select defaultValue={c.status} className="bg-[#111111] p-2">
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      className="text-[#a9e084] hover:text-[#709657] cursor-pointer"
                      onClick={Click}> Delete
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
