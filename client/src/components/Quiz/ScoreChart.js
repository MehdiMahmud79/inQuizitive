import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const options = {
  responsive: true,

  plugins: {
    legend: { display: true, position: "top" },
  },
  // layout: { padding: { bottom: 10 } },
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
const ScoreChart = ({ quizScores, userName, result }) => {
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState([]);
  useEffect(() => {
    // console.log("Quiz data ", quizScores);
    quizScores.sort(function (a, b) {
      return a.score - b.score;
    });
    const userNames = quizScores.map((user) => {
      return user.userName;
    });
    const scores = quizScores.map((user) => {
      return parseInt(user.score);
    });
    setScores(scores);
    setUserNames(userNames);
  }, []);
  // console.log("labelData array", scores);

  const data = {
    labels: userNames,
    datasets: [
      {
        label: "Previous Scores",
        data: scores,
        fill: true,
        backgroundColor: "rgba(0, 20, 235, 0.5)",
        pointBorderColor: "rgba(0, 250, 150, 0.8)",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: `${userName}`,
        data: result,
        fill: true,
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        pointBorderColor: "green",
        pointBorderWidth: 3,
        pointRadius: 6,
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="bg-gray-300 p-2 my-3">
      <h1 className="bg-gray-600 text-white p-2 text-center">
        {" "}
        <i className="fas fa-chart-line text-yellow-300 text-3xl"></i> Max
        Scores
      </h1>
      <Line width={600} data={data} options={options} />
    </div>
  );
};

export default ScoreChart;
