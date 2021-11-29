import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
} from "victory";

const scoreChart = () => {
  return (
    <div>
      <h1>Barchartd</h1>
      <VictoryGroup
        data={[
          { x: "mehdi", y: 2, name: "mehdi" },
          { x: "sd", y: 3, name: "sd" },
          { x: "fd", y: 5, name: "fd" },
          { x: "messhdi", y: 4, name: "messhdi" },
          { x: "mehfdfdsdi", y: 7, name: "mehfdfdsdi" },
        ]}
        color="blue"
      >
        <VictoryChart />
        <VictoryLine
          interpolation="natural"
          labels={({ datum }) => datum.name}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
        />
        <VictoryScatter size={8} symbol="circle" />
      </VictoryGroup>
    </div>
  );
};

export default scoreChart;
