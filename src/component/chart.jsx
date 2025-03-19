import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getdaterange } from "../api/emailTemplate";

const Barchart = () => {
  Chart.register(...registerables, ChartDataLabels);

  // Calculate default dates (end date = today, start date = 6 days before)
  const today = new Date();
  const defaultEndDate = new Date(today);
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 6);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(true); // Set to true to load data on initial render
  const [emailStats, setEmailStats] = useState({
    successful: 0,
    failed: 0,
    total: 0,
  });

  // Calculate the actual interval between selected dates
  const actualInterval =
    Math.round((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;

  // Calculate the earliest allowed start date (7 days before today)
  const earliestStartDate = new Date(today);
  earliestStartDate.setDate(today.getDate() - 7 + 1);

  // Handle start date change
  const handleStartDateChange = (date) => {
    // Calculate max allowed days from this start date
    const maxEndDate = new Date(date);
    maxEndDate.setDate(date.getDate() + 7 - 1);

    // If current end date is more than 7 days away, adjust it
    if ((endDate - date) / (24 * 60 * 60 * 1000) >= 7) {
      setEndDate(maxEndDate > today ? today : maxEndDate);
    }

    // If current end date is before new start date, set end date to start date
    if (endDate < date) {
      setEndDate(date);
    }

    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    // Don't allow end date beyond today
    if (date > today) {
      setEndDate(today);
      return;
    }

    // Calculate minimum allowed start date based on this end date
    const minStartDate = new Date(date);
    minStartDate.setDate(date.getDate() - 7 + 1);

    // If current start date is more than 7 days before end date, adjust it
    if ((date - startDate) / (24 * 60 * 60 * 1000) >= 7) {
      setStartDate(minStartDate);
    }

    // If current start date is after new end date, set start date to end date
    if (startDate > date) {
      setStartDate(date);
    }

    setEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      const start_date = dayjs(startDate).format("YYYY-MM-DD");
      const end_date = dayjs(endDate).format("YYYY-MM-DD");

      setLoading(true);
      try {
        const response = await getdaterange(start_date, end_date);
        console.log(response);

        const apiData = response.data;
        const allDates = [];
        let currentDate = dayjs(startDate);
        const endDateObj = dayjs(endDate);

        while (currentDate <= endDateObj) {
          allDates.push(currentDate.format("YYYY-MM-DD"));
          currentDate = currentDate.add(1, "day");
        }

        const formattedLabels = allDates.map((date) =>
          dayjs(date).format("DD MMM")
        );
        const successfulSendsData = allDates.map((date) => {
          const index = apiData.labels.indexOf(date);
          return index !== -1 ? apiData.successful_sends[index] : 0;
        });

        // Calculate email stats
        const successful = successfulSendsData.reduce((a, b) => a + b, 0);
        const failed = apiData.failed_sends
          ? apiData.failed_sends.reduce((a, b) => a + b, 0)
          : 0;
        const total = successful + failed;
        setEmailStats({ successful, failed, total });

        setChartData({
          labels: formattedLabels,
          datasets: [
            {
              label: "Successful Sends",
              data: successfulSendsData,
              backgroundColor: "#34d399",
              borderColor: "#10B981",
              borderWidth: 2,
              hoverBackgroundColor: "#10B981",
              barPercentage: 0.9,
              barThickness: 30,
              borderRadius: 8,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    if (isClicked) {
      fetchData();
      setIsClicked(false);
    }
  }, [startDate, endDate, isClicked]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, weight: "bold", color: "#333" },
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value,
        font: { size: 12, weight: "bold" },
        color: "#000",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { autoSkip: false, font: { size: 12 }, color: "#555" },
      },

      y: {
        beginAtZero: true,
        max: 20,
        grid: { color: "#ddd" },
        ticks: { stepSize: 2, font: { size: 12 }, color: "#555" },
      },
    },
    elements: {
      bar: { barPercentage: 0.9, barThickness: 30, borderRadius: 2 },
    },
  };

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-xl font-bold mb-4 text-center">
        Email Report ({dayjs(startDate).format("DD MMM")} -{" "}
        {dayjs(endDate).format("DD MMM")})
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-1 w-full">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            maxDate={endDate}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={startDate}
            maxDate={today}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="w-full md:w-auto">
          <button
            onClick={() => setIsClicked(true)}
            disabled={actualInterval > 7}
            className={`text-white px-2 py-2 rounded-md shadow-md mt-3 text-sm ${
              actualInterval > 7
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
          >
            Get Data
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mt-3">
        <p
          className={`text-white text-sm font-normal text-center px-4 py-2 rounded-lg shadow-lg ${
            actualInterval > 7 ? "bg-red-500" : "bg-[#3B82F6]"
          }`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-white mr-2 text-[12px] inline-block"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path>
          </svg>
          {actualInterval > 7
            ? `Date range exceeds maximum of 7 days. Current: ${actualInterval} days.`
            : `Date range: ${actualInterval} day${
                actualInterval !== 1 ? "s" : ""
              }. Today is the latest selectable date.`}
        </p>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="relative w-full h-96">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default Barchart;
