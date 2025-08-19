import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StocksTable(props) {
    console.log(props)
  const [rows, setRows] = useState([]);  // Estado para guardar los datos
  const [loading, setLoading] = useState(true);

  // Llamar a la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/portafolio?user=SS");
        setRows(res.data);  // Guardamos los datos en el estado
        console.log(res.data)
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="portafolio table">
        <TableHead>
          <TableRow>
            <TableCell>NUMERO</TableCell>
            <TableCell>CURRENCY</TableCell>
            <TableCell>SYMBOL</TableCell>
            <TableCell>AMOUNT PURCHASED</TableCell>
            <TableCell>PONDERACIONES</TableCell>
            <TableCell>PREVIOUS QUOTATION</TableCell>
            <TableCell>TOTAL INVESTED</TableCell>
            <TableCell>PORTAFOLIO CURRENT VALUE</TableCell>
            <TableCell>PROFIT/LOSS</TableCell>
            <TableCell>ROI</TableCell>
            <TableCell>CHANGE 24h</TableCell>
            <TableCell>CURRENT PRICE</TableCell>
            <TableCell>DAILY RETURN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.NUMERO}>
              <TableCell>{row.NUMERO}</TableCell>
              <TableCell>{row.CURRENCY}</TableCell>
              <TableCell>{row.SYMBOL}</TableCell>
              <TableCell>{row.AMOUNT_PURCHASED}</TableCell>
              <TableCell>{row.PONDERACIONES}</TableCell>
              <TableCell>{row.PREVIOUS_QUOTATION}</TableCell>
              <TableCell>{row.TOTAL_INVESTED}</TableCell>
              <TableCell>{row.PORTAFOLIO_CURRENT_VALUE}</TableCell>
              <TableCell>{row.PROFIT_LOSS}</TableCell>
              <TableCell>{row.ROI}</TableCell>
              <TableCell>{row.CHANGE_24}</TableCell>
              <TableCell>{row.CURRENT_PRICE}</TableCell>
              <TableCell>{row.DAILY_RETURN}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
