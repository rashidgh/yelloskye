import React, { useEffect, useState } from "react";
import { Database } from "../../database/database";
import Spinner from "./Spinner";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(Database);

  // Simulate data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loading delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = Database.filter(item =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredData(result);
  }, [searchQuery]);

  return (
    <div className="px-4">
      {/* Search Bar */}
      <div className="w-full max-w-[400px] mx-auto mt-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center mt-[30px]">
        {loading ? (
          <p className="text-xl font-semibold h-[60vh] w-[100vw] flex items-center justify-center">
            <Spinner />
          </p>
        ) : filteredData.length < 1 ? (
          <p className="h-[40vh] flex items-center justify-center text-xl font-semibold text-red-500">
            No matching products found.
          </p>
        ) : (
          filteredData.map((val, ind) => {
            const { image, title, price, rating } = val;
            return (
              <div
                key={ind}
                className="bg-white shadow flex flex-col items-center h-auto w-[250px] p-2 justify-around mt-[20px] rounded"
              >
                <img
                  className="h-[250px] object-contain"
                  width="200"
                  src={image}
                  alt={title}
                />
                <p className="mt-2">
                  <span>
                    <b>{price}</b>
                  </span>
                  <strike>
                    <b className="text-slate-600 ml-3">{rating?.count}</b>
                  </strike>
                </p>

                <p className="text-center text-sm mt-1">
                  {title.slice(0, 20)}...
                </p>

                <button className="bg-orange-500 hover:bg-orange-400 mt-3 p-2 w-full rounded text-white text-center cursor-pointer">
                  BUY NOW
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
