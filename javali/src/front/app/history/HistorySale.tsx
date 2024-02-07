import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, ButtonGroup, TableHead } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  name: string,
  type: Number,
  calories: number,
  fat: number,
  price: number,
  protein: number,
  carbs: number
) {
  return { name, type, calories, fat, carbs: 0, protein: 0, price: 0 };
}

const rows = [
  createData("Cupcake", 1, 305, 3.7, 1, 1, 1),
  createData("Donut", 1, 452, 25.0, 1, 1, 1),
  createData("Eclair", 1, 262, 16.0, 1, 1, 1),
  createData("Frozen yoghurt", 1, 159, 6.0, 1, 1, 1),
  createData("Gingerbread", 1, 356, 16.0, 1, 1, 1),
  createData("Honeycomb", 1, 408, 3.2, 1, 1, 1),
  createData("Ice cream sandwich", 1, 237, 9.0, 1, 1, 1),
  createData("Jelly Bean", 1, 375, 0.0, 1, 1, 1),
  createData("KitKat", 1, 518, 26.0, 1, 1, 1),
  createData("Lollipop", 1, 392, 0.2, 1, 1, 1),
  createData("Marshmallow", 1, 318, 0, 1, 1, 1),
  createData("Nougat", 360, 1, 19.0, 1, 1, 1),
  createData("Oreo", 437, 1, 18.0, 1, 1, 1),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function HistorySale() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{ padding: "16px 24px", backgroundColor: "#F5F5F5", height: "84vh" }}
    >
      <ButtonGroup
        sx={{ padding: "24px 16px" }}
        disableElevation
        variant="contained"
        color="secondary"
        aria-label="Disabled elevation buttons"
      >
        <Button>Hospedagens</Button>
        <Button variant="outlined">Experiências</Button>
      </ButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Avaliação</TableCell>
              <TableCell align="right">Bairro</TableCell>
              <TableCell align="right">Cidade</TableCell>
              <TableCell align="right">Periodo</TableCell>
              <TableCell align="right">Data check-out</TableCell>
              <TableCell align="right">Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.calories}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.fat}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.carbs}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.protein}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
