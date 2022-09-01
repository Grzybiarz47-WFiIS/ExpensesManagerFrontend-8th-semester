import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
    
const ReadOnlyRow = ({expense, expenses, setEditMode, setExpenses}) => {

    const handleTrashButtonClick = (expenses, id) => {
        fetch("https://expenses-manager-backend.herokuapp.com/payment/" + id, {
            method:"DELETE"
        }).then(()=>{
            const index = expenses.findIndex((elem) => elem.paymentID === id);
            expenses.splice(index, 1);
            setExpenses(Array.from(expenses));

            console.log("Payment deleted");
        });
    };

    return (
        <StyledTableRow key={expense.paymentID}>
        <StyledTableCell component="th" scope="row">
            {expense.paymentID}
        </StyledTableCell>
        <StyledTableCell>{expense.name}</StyledTableCell>
        <StyledTableCell align="right">{expense.amount}</StyledTableCell>
        <StyledTableCell align="right">{expense.currency}</StyledTableCell>
        <StyledTableCell align="right">{expense.category}</StyledTableCell>
        <StyledTableCell align="right">{expense.date}</StyledTableCell>
        <StyledTableCell align="right">{expense.tags.join(', ')}</StyledTableCell>
        <StyledTableCell align="center">
            <IconButton aria-label="edit" onClick={() => setEditMode(expense.paymentID)}>
                <EditIcon/>
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleTrashButtonClick(expenses, expense.paymentID)}>
                <DeleteIcon/>
            </IconButton>
        </StyledTableCell>
        </StyledTableRow>
    );
}

export default ReadOnlyRow;