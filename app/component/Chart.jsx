"use client";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const lineData = {
  labels: [
    "May 23",
    "Jun 23",
    "Jul 23",
    "Aug 23",
    "Sep 23",
    "Oct 23",
    "Nov 23",
    "Dec 23",
    "Jan 24",
    "Feb 24",
    "Mar 24",
    "Apr 24",
    "May 24",
    "Jun 24",
    "Jul 24",
    "Aug 24",
    "Sep 24",
    "Oct 24",
    "Nov 24",
    "Dec 24",
    "Jan 25",
    "Feb 25",
    "Mar 25",
    "Apr 25",
    "May 25",
    "Jun 25",
    "Jul 25",
    "Aug 25",
    "Sep 25",
    "Oct 25",
    "Nov 25",
    "Dec 25",
  ],
  datasets: [
    {
      label: "Planned",
      data: [
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 78, 80,
        81, 82, 83, 83.5, 84, 84.2, 84.3, 84.4, 84.45, 84.47, 84.48, 84.49,
        84.5, 84.51,
      ],
      borderColor: "#3498db",
      fill: false,
    },
    {
      label: "Actual",
      data: [
        0, 4, 9, 14, 18, 23, 28, 32, 36, 40, 44, 48, 52, 57, 62, 66, 69, 71, 72,
        73, 74, 75, 76, 77, 78, 78.2,
      ],
      borderColor: "#e74c3c",
      fill: false,
    },
  ],
};

const barStageData = {
  labels: ["Excavation", "Substructure", "Superstructure", "Finishing"],
  datasets: [
    {
      label: "Planned",
      backgroundColor: "#3498db",
      data: [100, 80, 60, 20],
    },
    {
      label: "Actual",
      backgroundColor: "#e74c3c",
      data: [98, 75, 58, 10],
    },
  ],
};

const barTowerData = {
  labels: ["Tower A", "Tower B"],
  datasets: [
    {
      label: "Planned",
      backgroundColor: "#3498db",
      data: [90, 80],
    },
    {
      label: "Actual",
      backgroundColor: "#e74c3c",
      data: [88, 75],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function ChartsPage() {
  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Line Chart (Top) */}
      <div style={{ flex: 1 }}>
        <Line data={lineData} options={chartOptions} />
      </div>

      {/* Bar Charts (Bottom Row, Side-by-Side) */}
      <div style={{ flex: 1, display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <Bar data={barStageData} options={chartOptions} />
        </div>
        <div style={{ flex: 1 }}>
          <Bar data={barTowerData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
