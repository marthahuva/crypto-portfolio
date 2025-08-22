import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function AddCoin( { onCloseReload } ) {
  const [open, setOpen] = React.useState(false);
  const [coins, setCoins] = React.useState([]);
  const [selectedCoin, setSelectedCoin] = React.useState("");
  const [cantidad, setCantidad] = React.useState("");
  const [error, setError] = React.useState("");

  // Cargar monedas desde backend
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/cryptoCoins")
      .then((res) => {
        console.log("Datos recibidos:", res.data); // 🔍 Debug
        setCoins(res.data);
      })
      .catch((err) => console.error("Failed to load coin:", err));
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedCoin("");
    setCantidad("");
    setError("");
    onCloseReload();
  };

  const handleCantidadChange = (e) => {
    const value = e.target.value;
    if (value <= 0) {
      setError("Amount must be a positive number");
    } else {
      setError("");
    }
    setCantidad(value);
  };

  const handleSubmit = async () => {
    if (!selectedCoin || !cantidad || cantidad <= 0) {
      setError("You must select a coin and enter a valid amount");
      return;
    }

    try {
      const payload = {
        id_coin: selectedCoin,
        cantidadAcomprar: Number(cantidad),
      };

      await axios.post(
        "http://localhost:3000/addCoin/rafakitlhdez@gmail.com",
        payload
      );

      alert("Coin inserted succesfully🚀");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error loading coin ❌");
    }
  };

  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Button variant="contained" size="small" onClick={handleClickOpen}>
          Add coin
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new coin</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel id="coin-select-label">Coin</InputLabel>
              <Select
                labelId="coin-select-label"
                value={selectedCoin || ""}
                onChange={(e) => setSelectedCoin(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select a coin</em>
                </MenuItem>
                {coins.map((coin, index) => (
                  <MenuItem
                    key={index}
                    value={coin.id_Coin}
                  >
                    {coin.id_Coin}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              label="Amount to insert"
              type="number"
              fullWidth
              value={cantidad || ""}
              onChange={handleCantidadChange}
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedCoin || !cantidad || cantidad <= 0}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
