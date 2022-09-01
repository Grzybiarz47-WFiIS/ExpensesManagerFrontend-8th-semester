import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, home, holiday, car, food, tickets, pets, health, emptyCat) {
  id += 1;
  return {id, name, home, holiday, car, food, tickets, pets, health, emptyCat}
}

function SimpleTable(expenses) {
    expenses = expenses.expenses

    var rowsNames = ['PLN', 'EUR', 'USD', 'CHF', 'GBP']
    var columnsNames = ['Dom', 'Wakacje', 'Samochód', 'Jedzenie', 'Bilety', 'Zwierzęta', 'Zdrowie', 'Brak']
    var rows = []

    for (let i = 0; i < rowsNames.length; i++)
    {
        let name = rowsNames[i]
        let row = []
        for (let j = 0; j < columnsNames.length; j++)
        {
            let column = columnsNames[j]
            let sum = 0
            for (let k = 0; k < expenses.length; k++)
            {
                let expense = expenses[k]
                if (expense.category === column && expense.currency === name)
                    sum += expenses[k].amount
            }
            row.push(sum)
        }
        rows.push(
            createData(name, row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])
        )
    }

    return (
        <Table sx={{ minWidth: 700 }}>
            <TableHead>
            <TableRow>
                <TableCell>X</TableCell>
                <TableCell align="right">Dom</TableCell>
                <TableCell align="right">Wakacje</TableCell>
                <TableCell align="right">Samochód</TableCell>
                <TableCell align="right">Jedzenie</TableCell>
                <TableCell align="right">Bilety</TableCell>
                <TableCell align="right">Zwierzęta</TableCell>
                <TableCell align="right">Zdrowie</TableCell>
                <TableCell align="right">Brak</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.home}</TableCell>
                <TableCell align="right">{row.holiday}</TableCell>
                <TableCell align="right">{row.car}</TableCell>
                <TableCell align="right">{row.food}</TableCell>
                <TableCell align="right">{row.tickets}</TableCell>
                <TableCell align="right">{row.pets}</TableCell>
                <TableCell align="right">{row.health}</TableCell>
                <TableCell align="right">{row.emptyCat}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    );
}

export default withStyles(styles)(SimpleTable);
