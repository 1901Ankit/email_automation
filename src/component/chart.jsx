import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { getdaterange } from "../api/emailTemplate"; 
const Barchart = () => {
  Chart.register(...registerables, ChartDataLabels);

  const [dateRange, setDateRange] = useState([
    new Date("2024-12-10"),
    new Date("2024-12-16"),
  ]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const [startDate, endDate] = dateRange;
      const start_date = dayjs(startDate).format("YYYY-MM-DD");
      const end_date = dayjs(endDate).format("YYYY-MM-DD");
      try {
        const response = await getdaterange(start_date, end_date);
        const apiData = response.data;

        const filteredLabels = apiData.labels.filter(
          (_, index) =>
            apiData.successful_sends[index] > 0 ||
            apiData.failed_sends[index] > 0
        );

        const formattedLabels = filteredLabels.map((date) =>
          dayjs(date).format("DD MMM")
        );

        setChartData({
          labels: formattedLabels,
          datasets: [
            {
              label: "Successful Sends",
              data: filteredLabels.map(
                (label) =>
                  apiData.successful_sends[apiData.labels.indexOf(label)] || 0
              ),
              backgroundColor: "#34d399",
              barPercentage: 0.1,
              borderRadius: 5,
            },
            {
              label: "Failed Sends",
              data: filteredLabels.map(
                (label) =>
                  apiData.failed_sends[apiData.labels.indexOf(label)] || 0
              ),
              backgroundColor: "#f87171",
              barPercentage: 0.5,
              borderRadius: 5,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [dateRange]);

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
        grid: { display: false },
        ticks: { autoSkip: false, font: { size: 10 }, color: "#555" },
      },
      y: {
        beginAtZero: true,
        max: 31,
        grid: { color: "#ddd" },
        ticks: { stepSize: 1, font: { size: 12 }, color: "#555" },
      },
    },
  };

  const handleInputClick = () => {
    setCalendarOpen(!calendarOpen);
  };
  const handleDateChange = (dates) => {
    setDateRange(dates);
    setCalendarOpen(false); 
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        Email Report ({dayjs(dateRange[0]).format("DD MMM")} -{" "}
        {dayjs(dateRange[1]).format("DD MMM")})
      </h2>
      <div className="flex justify-center space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="relative">
            <input
              type="text"
              value={`${dayjs(dateRange[0]).format("YYYY-MM-DD")} - ${dayjs(dateRange[1]).format("YYYY-MM-DD")}`}
              onClick={handleInputClick}
              readOnly
              className="border p-2 rounded-md w-full cursor-pointer"
            />

            <div
              className={` top-full left-0 mt-2 w-[300px]  transition-all duration-500 ease-in-out transform ${
                calendarOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-[-10px] pointer-events-none"
              }`}
            >
              {calendarOpen && (
                <DatePicker
                  selected={dateRange[0]}
                  onChange={handleDateChange}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  selectsRange
                  inline
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-3"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="relative w-full h-96">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Barchart;
