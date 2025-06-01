'use client'
export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex justify-center item-center w-[100vw]">
      <input
      type="text"
      placeholder="Search projects..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-[60vw] p-2 border rounded"
    />
    </div>
  );
}
