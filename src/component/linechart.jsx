import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2"; // Change Pie to Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getEmailList } from "../api/emailTemplate";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Linechart = (props) => {
  const [chartData, setChartData] = useState({
    labels: ["Failed Sends", "Successful Sends"],
    datasets: [],
  });
  const [totalSends, setTotalSends] = useState({
    successful_sends: 0,
    failed_sends: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmailList(props.total_emails);
        const apiData = response.data;
        setTotalSends({
          successful_sends: apiData.successful_sends,
          failed_sends: apiData.failed_sends,
        });
        const updatedChartData = {
          labels: ["Failed", "Successful"],
          datasets: [
            {
              label: "Email Sends",
              data: [apiData.failed_sends, apiData.successful_sends],
              backgroundColor: ["#ce464f", "#46bf5a"],
              borderColor: ["#ce464f", "#46bf5a"],
              borderWidth: 1,
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
        labels: {
          font: {
            size: 12,
            family: "Arial",
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Doughnut Chart */}
      <div className="relative w-full h-96 mt-5">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Linechart;
