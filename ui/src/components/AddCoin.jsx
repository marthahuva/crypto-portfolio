import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCoin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);   // Abrir pop-up
  const handleClose = () => setOpen(false);      // Cerrar pop-up

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <div>
        <Button variant="contained" size="small" onClick={handleClickOpen}>
          Add coin
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Agregar nueva coin</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aquí puedes poner un formulario o información para agregar una coin.
            </DialogContentText>
            {/* Por ejemplo, podrías agregar inputs aquí */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={() => { /* lógica para agregar coin */ }}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
