import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import ChipInput from 'material-ui-chip-input';
import Button from '@mui/material/Button';

export default function Expense() {
    const paperStyle = {padding:'10px 10px', width:600, margin:'20px auto'}

    const [name, setName] = React.useState('');

    const [amount, setAmount] = React.useState('');
    const handleChangeAmount = event => {
        const result = event.target.value.replace(/\D/g, '');
        setAmount(result);
    };
    
    const [category, setCategory] = React.useState('');

    const [currency, setCurrency] = React.useState('');

    const [date, setDate] = React.useState('');

    const [tags, setTags] = React.useState([]);
    const onAddTag = (chip) => {
        if (tags.length >= 3) return;
        setTags([...tags, chip]);
    };
    const onDeleteTag = (chip, index) => {
        setTags(tags.slice(0, index).concat(tags.slice(index + 1)));
    };

    const handleAddButtonClick = event => {
        event.preventDefault();
        var expense = {name, amount, category, currency, date, tags};
        console.log(expense);

        if (name === '' || amount === '' || date === '')
        {
            console.log("Insufficent data provided");
            return;
        }

        if (currency === '') expense.currency = 'PLN';
        if (category === '') expense.category = 'Brak';
        
        fetch("https://expenses-manager-backend.herokuapp.com/payment/", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(expense)
        }).then(()=>{
            console.log("New payment added");
            setName('')
            setAmount('')
            setCategory('')
            setCurrency('')
            setDate('')
            setTags([])
        });
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Dodaj wydatek</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { margin: 2, width: '50ch' }
                    }}
                    noValidate
                    autoComplete="off"
                    >

                <TextField
                    id="name" 
                    label="Nazwa"
                    variant="outlined"
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    required
                 />

                <TextField 
                    id="amount"
                    label="Koszt" 
                    variant="outlined" 
                    value={amount}
                    onChange={handleChangeAmount}
                    required
                />

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

                <TextField
                    id="date"
                    label="Data"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={date}
                    onChange={(event)=>setDate(event.target.value)}
                    required
                />

                <ChipInput
                    id="chips"
                    label="Dodaj tagi"
                    helperText="Wpisz tag i wciśnij Enter"
                    value={tags}
                    onAdd={onAddTag}
                    onDelete={onDeleteTag}>
                </ChipInput>

                <Button variant="contained" onClick={handleAddButtonClick}>Dodaj</Button>
                </Box>
            </Paper>
        </Container>
    );
}