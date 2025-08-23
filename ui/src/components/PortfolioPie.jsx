import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card, CardContent, Typography } from "@mui/material";
import {Decimal} from "decimal.js"

ChartJS.register(Title, ChartTooltip, Legend, ArcElement, ChartDataLabels);

export default function PortfolioPie({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <Card sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" align="center">
          No hay datos en el portafolio aún 📉
        </Typography>
      </Card>
    );
  }

  const pieData = {
    labels: rows.map((r) => r.CURRENCY),
    datasets: [
      {
        label: "Ponderación %",
        data: rows.map((r) => parseFloat(r.PONDERACIONES.slice(0,6))),
        backgroundColor: [
          "#2e7d32", // verde fuerte
          "#c8e6c9",
          "#e0e0e0", // gris claro
          "#bdbdbd",
          "#9e9e9e",
          "#757575",
          "#424242"  // gris oscuro
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}%`,
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value) => `${value}%`,
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
  };

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Portfololio current value
        </Typography>
        <Pie data={pieData} options={pieOptions} />
      </CardContent>
    </Card>
  );
}
