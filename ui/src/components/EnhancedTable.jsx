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

// ---------- HEAD CELLS ----------
const headCells = [
  { id: "NUMERO", numeric: false, disablePadding: true, label: "NUMBER" },
  { id: "CURRENCY", numeric: false, disablePadding: false, label: "CURRENCY" },
  // { id: "SYMBOL", numeric: false, disablePadding: false, label: "SYMBOL" },
  { id: "AMOUNT_PURCHASED", numeric: true, disablePadding: false, label: "AMOUNT PURCHASED" },
  { id: "PONDERACIONES", numeric: true, disablePadding: false, label: "WEIGHT %" },
  { id: "PREVIOUS_QUOTATION", numeric: true, disablePadding: false, label: "PREVIOUS QUOTATION" },
  { id: "TOTAL_INVESTED", numeric: true, disablePadding: false, label: "TOTAL INVESTED" },
  { id: "PORTAFOLIO_CURRENT_VALUE", numeric: true, disablePadding: false, label: "PORTFOLIO CURRENT VALUE" },
  { id: "PROFIT_LOSS", numeric: true, disablePadding: false, label: "PROFIT/LOSS" },
  { id: "ROI", numeric: true, disablePadding: false, label: "ROI" },
  { id: "CHANGE_24", numeric: true, disablePadding: false, label: "CHANGE 24h" },
  { id: "CURRENT_PRICE", numeric: true, disablePadding: false, label: "CURRENT PRICE" },
  { id: "DAILY_RETURN", numeric: true, disablePadding: false, label: "DAILY RETURN" },
];

// ---------- SORT UTILS ----------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

// ---------- TABLE HEAD ----------
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// ---------- TOOLBAR ----------
function EnhancedTableToolbar({ numSelected, selected, onDelete }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {/* Portafolio */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// ---------- MAIN COMPONENT ----------
export default function EnhancedTable({reload}) {
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("NUMERO");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const correo = "rafakitlhdez@gmail.com"; // 🔹 correo fijo para el ejemplo

  // Cargar datos desde tu API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/portafolio?user=${correo}`);
        setRows(res.data);
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      }
    };
    fetchData();
  }, [reload]);

  // ---------- DELETE SELECCIONADOS ----------
  const handleDelete = async (selectedIds) => {
    try {
      for (const id_coin of selectedIds) {
        await axios.delete(`http://localhost:3000/deleteCoin/${correo}?id_coin=${id_coin}`);
      }
      setRows((prev) => prev.filter((row) => !selectedIds.includes(row.CURRENCY)));
      setSelected([]);
      alert("Coin deleted successfully");
    } catch (err) {
      console.error("Failed deleting coin:", err);
      alert("Failed deleting coin");
    }
  };

  // ---------- TABLE HANDLERS ----------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.NUMERO);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, numero) => {
    const selectedIndex = selected.indexOf(numero);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = newSelected.concat(selected, numero);
    else if (selectedIndex === 0) newSelected = newSelected.concat(selected.slice(1));
    else if (selectedIndex === selected.length - 1) newSelected = newSelected.concat(selected.slice(0, -1));
    else if (selectedIndex > 0)
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (numero) => selected.indexOf(numero) !== -1;
  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} onDelete={handleDelete} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.CURRENCY);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.CURRENCY)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.CURRENCY}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.NUMERO}
                    </TableCell>
                    <TableCell>{row.CURRENCY}</TableCell>
                    {/* <TableCell>{row.SYMBOL}</TableCell> */}
                    <TableCell align="right">{new Decimal(row.AMOUNT_PURCHASED).toFixed(2)}</TableCell>
                    <TableCell align="right">{row.PONDERACIONES.slice(0,6)}</TableCell>
                    <TableCell align="right">{new Decimal(row.PREVIOUS_QUOTATION).toFixed(2)}</TableCell>
                    <TableCell align="right">{new Decimal(row.TOTAL_INVESTED).toFixed(2)}</TableCell>
                    <TableCell align="right">{new Decimal(row.PORTAFOLIO_CURRENT_VALUE).toFixed(2)}</TableCell>
                    <TableCell align="right">{new Decimal(row.PROFIT_LOSS).toFixed(2)}</TableCell>
                    <TableCell align="right">{new Decimal(row.ROI).toFixed(5)}</TableCell>
                    <TableCell align="right">{row.CHANGE_24}</TableCell>
                    <TableCell align="right">{new Decimal(row.CURRENT_PRICE).toFixed(2)}</TableCell>
                    <TableCell align="right">{new Decimal(row.DAILY_RETURN).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
