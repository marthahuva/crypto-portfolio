import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function ScoreCards() {
  const cards = [
    { title: "Investment", value: "$1,627" },
    { title: "Worst return", value: "-0.00005%" },
    { title: "Best return", value: "0.82290%" },
    { title: "Volatility", value: "31.6%" },
  ];

  return (
    <Grid container spacing={3} 
    justifyContent="center"   // ✅ centra horizontalmente
    sx={{ mb: 4 }}>
      {cards.map((card, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
