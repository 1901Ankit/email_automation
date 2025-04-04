import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getEmailList } from "../api/emailTemplate";
import { AlignCenter } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Linechart = ({ total_emails }) => {
  const [emailStats, setEmailStats] = useState({
    successful_sends: 0,
    failed_sends: 0,
    total_sends: 0,
  });

  const [chartData, setChartData] = useState({
    labels: ["Failed Sends", "Successful Sends"],
    datasets: [
      {
        label: "Email Sends",
        data: [0, 0, 0],
        backgroundColor: ["#ce464f", "#46bf5a"],
        borderColor: ["#ce464f", "#46bf5a"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("emailStats"));
    if (storedStats) {
      setEmailStats(storedStats);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmailList(total_emails);
        const apiData = response.data;

        setEmailStats({
          successful_sends: apiData.successful_sends,
          failed_sends: apiData.failed_sends,
          total_sends: apiData.total_sends,
        });

        localStorage.setItem("emailStats", JSON.stringify(apiData));

        setChartData({
          labels: ["Failed ", "Successful "],
          datasets: [
            {
              label: "Email Sends",
              data: [apiData.failed_sends, apiData.successful_sends],
              backgroundColor: ["#ce464f", "#46bf5a", "#f0ad4e"],
              borderColor: ["#ce464f", "#46bf5a", "#f0ad4e"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [total_emails]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          font: {
            size: 12,
            family: "Arial",
          },
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "center", 
        align: "center", 
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value, context) => {
          if (context.dataIndex < chartData.labels.length) {
            return `${chartData.labels[context.dataIndex]}: ${value}`;
          }
          return value;
        },
      },
    },
  };

  return (
    <div className="container-fluid p-2">
      <div className="relative w-full h-[350px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Linechart;
