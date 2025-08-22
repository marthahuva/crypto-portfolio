import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {Decimal} from "decimal.js"

// ---------- CONFIGURAR GRÁFICA ----------
 const pieData = {
  labels: rows.map((r) => r.CURRENCY),
  datasets: [
    {
      label: "Ponderación %",
      data: rows.map((r) => parseFloat(r.PONDERACIONES)),
      backgroundColor: [
        "#f94144", "#f3722c", "#f8961e", "#f9844a",
        "#f9c74f", "#90be6d", "#43aa8b", "#577590",
        "#277da1", "#8e44ad", "#e67e22", "#2ecc71"
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
  },
};

return (
  <Box sx={{ width: "100%" }}>

    {/* 📊 GRÁFICA DE PASTEL */}
    <Box sx={{ width: "50%", margin: "20px auto" }}>
      <Typography variant="h6" align="center">Distribución del Portafolio</Typography>
      <Pie data={pieData} options={pieOptions} />
    </Box>
  </Box>
);