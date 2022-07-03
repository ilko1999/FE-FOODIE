import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MyChip from "../mychip/mychip";
import lunchMenuFlow from "../../api/lunchMenuFlow";
import DataContext from "../../Context";

function Row({ row, resturantOrFastFood }) {
  const [open, setOpen] = React.useState(false);
  const { updateState } = React.useContext(DataContext);

  async function updateStatus(id) {
    try {
      const response = await lunchMenuFlow.updateStatusofOrder(id);
      updateState(response.data.status);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? "👉" : "👇"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {resturantOrFastFood === "resturant"
            ? row.tableNumber
            : row.personName}
        </TableCell>
        <TableCell>
          <MyChip label={row.status} />
        </TableCell>
        <TableCell align="right">
          {Math.round(row.totalAmount * 100) / 100}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <span className="flex justify-between">
                <Typography variant="h6" gutterBottom component="div">
                  Order Data
                </Typography>
                {row.status === "Initial" || row.status === "In-process" ? (
                  <span
                    className=" cursor-pointer inline-flex justify-center rounded-md border border-transparent p-2 font-medium bg-orange-500 text-white
                      hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-lg text-xs"
                    onClick={() => {
                      updateStatus(row._id);
                    }}
                  >
                    {row.status === "Initial"
                      ? "Update to In-Process"
                      : row.status === "In-process"
                      ? "Update to Finished"
                      : "Finished"}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type of meal</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price of meal</TableCell>
                    <TableCell>Amount ordered</TableCell>
                    <TableCell align="right">
                      Total price for the meal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.selectedItems.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.type}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.price}</TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(
                          historyRow.quantity * historyRow.price * 100
                        ) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  orderedItems,
  resturantOrFastFood,
}) {
  console.log(orderedItems);
  return (
    <>
      {orderedItems.length === 0 ? (
        <div className="flex justify-center">
          <span className="font-semibold text-3xl">
            Oops, sorry but it seems like you dont have any orders...🙅‍♂️📦
          </span>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  {resturantOrFastFood === "resturant"
                    ? "TableNumber"
                    : "Person Name"}
                </TableCell>
                <TableCell>Status of order</TableCell>
                <TableCell align="right">Total Price for the table</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderedItems.map((row) => (
                <Row
                  resturantOrFastFood={resturantOrFastFood}
                  key={row._id}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
