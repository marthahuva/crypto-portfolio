// src/components/PortfolioPie.jsx
import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";


const correo = "rafakitlhdez@gmail.com"; // 🔹 correo fijo para el ejemplo
let ponderaciones;

// Cargar datos desde tu API

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/portafolio?user=${correo}`);
      ponderaciones = res.data.map (crypto => parseFloat(crypto.PONDERACIONES.slice(0,-1)));
    } catch (err) {
      console.error("Error al cargar portafolio:", err);
    }
  };
  fetchData();


function PortfolioPie() {
  // Ejemplo con varias monedas y porcentajes
  const series = ponderaciones; // pesos relativos en %
  const options = {
    chart: {
      type: "pie",
      background: "#f4f7fa",
      toolbar: { show: true },
    },
    labels: ["Staked-Ether", "Bitcoin", "USDT"], // nombres de las monedas
    colors: ["#2a5298", "#ff9800", "#4caf50"],   // un color por moneda
    title: {
      text: "Distribución del Portafolio",
      align: "center",
    },
    legend: { position: "bottom" },
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "40px auto", 
      background: "#fff", 
      borderRadius: "12px", 
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
      padding: "20px" 
    }}>
      <Chart options={options} series={series} type="pie" height={400} />
    </div>
  );
}

export default PortfolioPie;