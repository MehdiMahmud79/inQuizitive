import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const data = {
  labels: ["Feras", "Jon", "Tom", "Georgia", "Mehdi"],
  datasets: [
    {
      label: "Iphone sales",
      data: [400, 1000, 4000, 800, 1500],
      fill: true,
      backgroundColor: "#2e4355",
      pointBorderColor: "#8884d8",
      pointBorderWidth: 5,
      pointRadius: 8,
      tension: 0.4,
    },
  ],
};

const options = {
  plugins: { legend: { display: false } },
  layout: { padding: { bottom: 10 } },
  scales: {
    y: {
      ticks: {
        color: "gray",
        font: {
          size: 15,
        },
      },
      grid: {
        color: "gray",
      },
    },
    x: {
      ticks: {
        color: "gray",
        font: {
          size: 12,
        },
      },
    },
  },
};
const ScoreChart = ({ quizScores }) => {
  useEffect(() => {
    console.log("Quiz data ", quizScores);
  }, []);
  return (
    <div className="bg-gray-300 p-2 my-3">
      <h1 className="bg-gray-600 text-white p-2 text-center">
        {" "}
        <i className="fas fa-chart-line"></i> Max Scores
      </h1>
      <Line width={600} data={data} options={options} />
    </div>
  );
};

export default ScoreChart;
