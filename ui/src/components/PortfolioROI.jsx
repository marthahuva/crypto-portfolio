import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {Decimal} from "decimal.js"

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function PortfolioROI({ rows }) {
  const barData = {
    labels: rows.map((r) => r.CURRENCY), // eje Y
    datasets: [
      {
        label: "ROI %",
        data: rows.map((r) => parseFloat(r.ROI).toFixed(5)),
        backgroundColor: "#4caf50", // verde para todos
      },
    ],
  };

  const barOptions = {
    indexAxis: "y", // barra horizontal
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Return on Investment (ROI)",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.formattedValue}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: { callback: (val) => `${val}%` },
      },
    },
  };

  return <Bar data={barData} options={barOptions} />;
}
