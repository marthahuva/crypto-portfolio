import React, { useEffect, useState } from "react";
import axios from "axios";
import { Decimal } from "decimal.js"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function StocksTable({reload}) {
    
  const [rows, setRows] = useState([]);  // Estado para guardar los datos
  const [loading, setLoading] = useState(true);

  // Llamar a la API al montar el componente
  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/portafolio?user=rafakitlhdez@gmail.com");
      const rows = res.data;
      rows.forEach(
          (row) => {
              row.TotalInvested = new Decimal(row.AmountPurchased).times( new Decimal(row.PreviousQuotation));
              row.PortfolioCurrentValue = new Decimal(row.AmountPurchased).times( new Decimal( row.CurrentPrice));
              row.ProfitLoss = new Decimal(row.PortfolioCurrentValue).minus( new Decimal( row.TotalInvested));
              row.Roi = row.ProfitLoss.dividedBy(row.TotalInvested).times( new Decimal(100));
          }
      );
      setRows(rows);  // Guardamos los datos en el estado
      console.log(res.data)
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setLoading(false);
    }
  };
  
  if (loading) return <p>Cargando datos...</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="portafolio table">
        <TableHead>
          <TableRow>
            <TableCell>CURRENCY</TableCell>
            <TableCell>SYMBOL</TableCell>
            <TableCell>AMOUNT PURCHASED</TableCell>
            <TableCell>PONDERACIONES</TableCell>
            <TableCell>PREVIOUS QUOTATION</TableCell>
            <TableCell>PURCHASE DATE</TableCell>
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
            <TableRow key={row.PurchaseId}>
              <TableCell>{row.Coin}</TableCell>
              <TableCell>{row.Symbol}</TableCell>
              <TableCell>{row.AmountPurchased}</TableCell>
              <TableCell>{row.PONDERACIONES}</TableCell>
              <TableCell>{row.PreviousQuotation}</TableCell>
              <TableCell>{row.Purchase_Date}</TableCell>
              <TableCell>{row.TotalInvested.toNumber()}</TableCell>
              <TableCell>{row.PortfolioCurrentValue.toNumber()}</TableCell>
              <TableCell>{row.ProfitLoss.toNumber()}</TableCell>
              <TableCell>{row.Roi.toNumber()} %</TableCell>
              <TableCell>{row.CHANGE_24}</TableCell>
              <TableCell>{row.CurrentPrice}</TableCell>
              <TableCell>{row.DAILY_RETURN}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
