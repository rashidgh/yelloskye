"use client";
export default function ProjectDetailTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 border-b pb-2">
      {["Images", "Videos"].map(tab => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
