import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getdaterange } from "../api/emailTemplate";
import dayjs from "dayjs";

const Barchart = () => {
  Chart.register(...registerables, ChartDataLabels);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const start_date = "2024-12-10";
      const end_date = "2024-12-16";

      try {
        const response = await getdaterange(start_date, end_date);
        console.log("API Response:", response);

        const apiData = response.data;

        // Filter out dates that don't have any data (i.e., no sends)
        const filteredLabels = apiData.labels.filter(
          (_, index) => apiData.successful_sends[index] > 0 || apiData.failed_sends[index] > 0
        );

        // Format labels to display date
        const formattedLabels = filteredLabels.map((date) => dayjs(date).format("DD MMM"));

        // Prepare datasets, ensuring that the data matches the filtered labels
        const updatedChartData = {
          labels: formattedLabels, // Formatted labels
          datasets: [
            {
              label: "Successful Sends",
              data: filteredLabels.map(
                (label) => apiData.successful_sends[apiData.labels.indexOf(label)] || 0
              ),
              backgroundColor: "#34d399", // Green color
              barPercentage: 0.1,
              borderRadius: 5, // Rounded bar corners
            },
            {
              label: "Failed Sends",
              data: filteredLabels.map(
                (label) => apiData.failed_sends[apiData.labels.indexOf(label)] || 0
              ),
              backgroundColor: "#f87171", // Red color
              barPercentage: 0.5,
              borderRadius: 5, // Rounded bar corners
            },
          ],
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value, 
        font: {
          size: 12,
          weight: "bold",
        },
        color: "#000",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          font: {
            size: 10,
          },
          color: "#555",
        },
      },
      y: {
        beginAtZero: true,
        max: 31, 
        grid: {
          color: "#ddd",
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
          color: "#555",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Email  Report (10 Dec - 16 Dec)
      </h2>
      <div className="relative w-full h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Barchart;
