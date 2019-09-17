import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

export default function SimpleTable({ rows, EditEntry }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Entry</TableCell>
            <TableCell align="center">Departure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow>
              <TableCell
                onClick={() => EditEntry(index)}
                key={item.entry + 1}
                align="center"
              >
                {item.entry.toLocaleTimeString()}
              </TableCell>
              <TableCell key={item.departure + 2} align="center">
                {item.departure === ""
                  ? ""
                  : item.departure.toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
