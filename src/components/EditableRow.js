import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    
const EditableRow = ({expense, expenses, setEditMode, setExpenses}) => {

    const [name, setName] = React.useState(expense.name);
    const [amount, setAmount] = React.useState(expense.amount);
    const [category, setCategory] = React.useState(expense.category);
    const [currency, setCurrency] = React.useState(expense.currency);
    const [date, setDate] = React.useState(expense.date);

    const handleChangeAmount = event => {
        const result = event.target.value.replace(/\D/g, '');
        setAmount(result);
    };

    const saveExpense = () => {
        if (name === '')
            setName(expense.name);
        if (amount === '')
            setAmount(expense.amount);
        
        var tags = expense.tags
        var modified = {name, amount, category, currency, date, tags};
        
        fetch("https://expenses-manager-backend.herokuapp.com/payment/" + expense.paymentID, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(modified)
        }).then(()=>{
            const index = expenses.findIndex((elem) => elem.paymentID === expense.paymentID);
            expenses.splice(index, 1);

            modified["paymentID"] = expense.paymentID
            expenses.push(modified)

            setExpenses(Array.from(expenses));
            
            console.log("Payment modified");
        });

        setEditMode(null)
    }

    return (
        <StyledTableRow key={expense.paymentID}>
        <StyledTableCell component="th" scope="row">
            {expense.paymentID}
        </StyledTableCell>
        <StyledTableCell>
            <TextField
                id="name" 
                label="Nazwa"
                variant="outlined"
                value={name}
                onChange={(event)=>setName(event.target.value)}
            />
        </StyledTableCell>
        <StyledTableCell align="right">
            <TextField 
                id="amount"
                label="Koszt" 
                variant="outlined" 
                value={amount}
                onChange={handleChangeAmount}
            />
        </StyledTableCell>
        <StyledTableCell align="right">
            <FormControl variant="outlined">
                <InputLabel id="currency">Waluta</InputLabel>
                <Select 
                    label="Waluta"
                    value={currency}
                    onChange={(event)=>setCurrency(event.target.value)}>
                <MenuItem value={"PLN"}>PLN</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"CHF"}>CHF</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
                </Select>
            </FormControl>
        </StyledTableCell>
        <StyledTableCell align="right">
            <FormControl variant="outlined">
                <InputLabel id="category">Kategoria</InputLabel>
                    <Select 
                        label="Kategoria"
                        value={category}
                        onChange={(event)=>setCategory(event.target.value)}>
                    <MenuItem value={"Dom"}>Dom</MenuItem>
                    <MenuItem value={"Wakacje"}>Wakacje</MenuItem>
                    <MenuItem value={"Samochód"}>Samochód</MenuItem>
                    <MenuItem value={"Jedzenie"}>Jedzenie</MenuItem>
                    <MenuItem value={"Bilety"}>Bilety</MenuItem>
                    <MenuItem value={"Zwierzęta"}>Zwierzęta</MenuItem>
                    <MenuItem value={"Zdrowie"}>Zdrowie</MenuItem>
                </Select>
            </FormControl>
        </StyledTableCell>
        <StyledTableCell align="right">
            <TextField
                id="date"
                label="Data"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={date}
                onChange={(event)=>setDate(event.target.value)}
            />
        </StyledTableCell>
        <StyledTableCell align="right">{expense.tags.join(', ')}</StyledTableCell>
        <StyledTableCell align="center">
            <IconButton aria-label="save" onClick={() => {saveExpense()}}>
                <SaveIcon/>
            </IconButton>
        </StyledTableCell>
        </StyledTableRow>
    );
}

export default EditableRow;