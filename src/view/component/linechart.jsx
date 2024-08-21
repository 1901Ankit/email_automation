import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Earning",
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
