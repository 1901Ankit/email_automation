import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; 
import { getEmailList } from "../api/emailTemplate";

const Barchart = (props) => {
  Chart.register(...registerables, ChartDataLabels); 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmailList(props.total_emails);
        const apiData = response.data;

        const updatedChartData = {
          labels: [""],
          datasets: [
            {
              backgroundColor: ["#338dfb"],
              barPercentage: 0.1,
              data: [apiData.total_emails],
              label: "Total Emails", 
            },
          ],
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [props.total_emails]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => {
          return `Total Emails : ${value}`;
        },
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#000",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
        min: 0,
        max: 200,
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
