import * as React from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

export default function List() {
    const paperStyle={padding:'50px 20px', width:800, margin:'20px auto'}

    const [expenses, setExpenses] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [isTableShown, showTable] = React.useState(false);
    const [editId, setEdit] = React.useState(null);
    const setEditMode = (id) => {
        setEdit(id);
    }

    const handleListAll = event => {
        event.preventDefault();
        
        fetch("https://expenses-manager-backend.herokuapp.com/payment/list")
        .then(result=>result.json())
        .then((result)=>{
            setExpenses(result);

            if (result.length > 0)
                showTable(true)
            else
                showTable(false)

            console.log(result);
        });
    }

    const handleListRange = event => {
        event.preventDefault();

        var search = "https://expenses-manager-backend.herokuapp.com/payment/list/range?";
        search += "start=" + startDate;
        search += "&end=" + endDate;
        search += "&category=" + category;
        search += "&tag=";
        
        fetch(search)
        .then(result=>result.json())
        .then((result)=>{
            setExpenses(result);

            if (result.length > 0)
                showTable(true)
            else
                showTable(false)

            console.log(result);
        });
    }

    const handleSearchTag = event => {
        event.preventDefault();
    
        var search = event.target.value;
    
        if (search === '')
          search = 'emptyTag'
            
        fetch("https://expenses-manager-backend.herokuapp.com/payment/list/range?start=&end=&category=&tag=" + search)
        .then(result=>result.json())
        .then((result)=>{
            setExpenses(result);

            if (result.length > 0)
                showTable(true)
            else
                showTable(false)

            console.log(result);
        });
    }

    const sortByName = () => {
        expenses.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        setExpenses(Array.from(expenses));
    }

    const sortByAmount = () => {
        expenses.sort(function(a, b) {
            return parseFloat(a.amount) - parseFloat(b.amount);
        });
        setExpenses(Array.from(expenses));
    }

    const sortByCurrency = () => {
        expenses.sort(function(a, b) {
            return a.currency.localeCompare(b.currency);
        });
        setExpenses(Array.from(expenses));
    }

    const sortByCategory = () => {
        expenses.sort(function(a, b) {
            return a.category.localeCompare(b.category);
        });
        setExpenses(Array.from(expenses));
    }

    const sortByDate = () => {
        expenses.sort(function(a, b) {
            let first = Date.parse(a.date);
            let second = Date.parse(b.date);
            return first - second;
        });
        setExpenses(Array.from(expenses));
    }

    return (
        <Container>
            <Paper id="list" elevation={3} style={paperStyle}>
                <h1>Lista wydatków</h1>

                <SearchIcon sx={{ marginLeft: 30 }}/>
                <InputBase
                    sx={{ margin: "20px", minWidth: 350 }}
                    placeholder="Wyszukaj po tagu"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchTag}
                />

                <FormControl variant="outlined" sx={{ margin: "20px", minWidth: 200 }}>
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
                    <MenuItem value={""}>Brak</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="date"
                    label="Data początkowa"
                    type="date"
                    sx={{ margin: "20px", width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={startDate}
                    onChange={(event)=>setStartDate(event.target.value)}
                />

                <TextField
                    id="date"
                    label="Data końcowa"
                    type="date"
                    sx={{ margin: "20px", width: 220 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={endDate}
                    onChange={(event)=>setEndDate(event.target.value)}
                />

                <Button 
                    variant="contained"
                    sx={{ margin: "20px", width: 150 }}
                    onClick={handleListRange}>
                    Wyszukaj po kryteriach
                </Button>
                <Button 
                    variant="contained"
                    sx={{ margin: "20px", width: 150 }}
                    onClick={handleListAll}>
                    Pokaż wszystko
                </Button>
            </Paper>
            
            {isTableShown &&
            <form>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>
                            <Button 
                                variant="outlined"
                                sx={{ minWidth: 100, fontWeight: 800 }}
                                onClick={() => sortByName()}>
                                Nazwa
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            <Button 
                                variant="outlined"
                                sx={{ minWidth: 100, fontWeight: 800 }}
                                onClick={() => sortByAmount()}>
                                Koszt
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            <Button 
                                variant="outlined"
                                sx={{ minWidth: 100, fontWeight: 800 }}
                                onClick={() => sortByCurrency()}>
                                Waluta
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            <Button 
                                variant="outlined"
                                sx={{ minWidth: 100, fontWeight: 800 }}
                                onClick={() => sortByCategory()}>
                                Kategoria
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            <Button 
                                variant="outlined"
                                sx={{ minWidth: 100, fontWeight: 800 }}
                                onClick={() => sortByDate()}>
                                Data
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">Tagi</StyledTableCell>
                            <StyledTableCell align="center">Akcje</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {expenses.map((expense) => (
                            <React.Fragment>
                                {
                                    editId === expense.paymentID ? 
                                    <EditableRow 
                                        expense={expense} 
                                        expenses={expenses}
                                        setEditMode={setEditMode}
                                        setExpenses={setExpenses}
                                    /> 
                                    : 
                                    <ReadOnlyRow 
                                        expense={expense} 
                                        expenses={expenses}
                                        setEditMode={setEditMode}
                                        setExpenses={setExpenses}
                                    />
                                }
                            </React.Fragment>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
            }

        </Container>
    );
}