import React from "react";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ChartDataLabels,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  ArcElement
);
function ChartComponent({ type, chartData }) {
  return (
    <Chart
      type={type}
      data={chartData}
      height={300}
      width={300}
      style={{ maxHeight: 300, maxWidth: "100%" }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          datalabels: {
            display: true,
            color: "white",
            font: { size: "16" },
          },
          title: {
            display: true,
            text: `${type} Chart`,
          },
        },
      }}
    />
  );
}

export default ChartComponent;
