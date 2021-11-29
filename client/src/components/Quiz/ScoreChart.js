import React, { useEffect } from "react";

const ScoreChart = ({ quizScores }) => {
  useEffect(() => {
    console.log("Quiz data ", quizScores);
  }, []);
  return (
    <div>
      <h1>Barchartd</h1>
    </div>
  );
};

export default ScoreChart;
