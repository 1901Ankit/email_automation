import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const Barchart = (props) => {
  Chart.register(...registerables);
  const chartData = {
    labels: props.data.map((val) => val.year),
    datasets: [
      {
        backgroundColor: props.data.map((val) => val.bg),
        barPercentage: 0.5,
        data: props.data.map((val) => val.range),
        label: "Earnings by Year",
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
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Barchart;
