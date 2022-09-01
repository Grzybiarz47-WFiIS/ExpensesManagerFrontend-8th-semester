import * as React from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SimpleTable from "./SimpleTable";

export default function Report() {
    const paperStyle={padding:'50px 20px', width:600, margin:'20px auto'}
    const tableStyle={padding:'50px 20px', width:1000, margin:'20px auto'}

    const [month, setMonth] = React.useState("Sierpień")
    const [year, setYear] = React.useState('2022');
    const [isRaportShown, showRaport] = React.useState(false);
    const [expenses, setExpenses] = React.useState([]);

    const handleChangeYear = event => {
        const result = event.target.value.replace(/\D/g, '');
        setYear(result);
    };

    const handleShowRaport = event => {
        const [startDate, endDate] = manageDates(month, year)

        var search = "https://expenses-manager-backend.herokuapp.com/payment/list/range?start="
        search += startDate + "&end=" + endDate + "&category=&tag="
        fetch(search)
        .then(result=>result.json())
        .then((result)=>{
            setExpenses(result);

            if (result.length > 0)
                showRaport(true)
            else
                showRaport(false)

            console.log(result);
        });

    };
    
    return (
        <Container>
            <Paper id="list" elevation={3} style={paperStyle}>
                <h1>Raport miesięczny</h1>

                <FormControl variant="outlined" sx={{ margin: "20px", minWidth: 200 }}>
                    <InputLabel id="category">Miesiąc</InputLabel>
                        <Select 
                            label="Miesiąc"
                            value={month}
                            onChange={(event)=>setMonth(event.target.value)}>
                        <MenuItem value={"Styczeń"}>Styczeń</MenuItem>
                        <MenuItem value={"Luty"}>Luty</MenuItem>
                        <MenuItem value={"Marzec"}>Marzec</MenuItem>
                        <MenuItem value={"Kwiecień"}>Kwiecień</MenuItem>
                        <MenuItem value={"Maj"}>Maj</MenuItem>
                        <MenuItem value={"Czerwiec"}>Czerwiec</MenuItem>
                        <MenuItem value={"Lipiec"}>Lipiec</MenuItem>
                        <MenuItem value={"Sierpień"}>Sierpień</MenuItem>
                        <MenuItem value={"Wrzesień"}>Wrzesień</MenuItem>
                        <MenuItem value={"Październik"}>Październik</MenuItem>
                        <MenuItem value={"Listopad"}>Listopad</MenuItem>
                        <MenuItem value={"Grudzień"}>Grudzień</MenuItem>
                    </Select>
                </FormControl>

                <TextField 
                    sx={{ margin: "20px", minWidth: 200 }}
                    id="year"
                    label="Rok" 
                    variant="outlined" 
                    value={year}
                    onChange={handleChangeYear}
                    required
                />

                <Button
                    variant="contained"
                    sx={{ margin: "20px", minWidth: 200 }}
                    onClick={handleShowRaport}>
                    Pokaż raport
                </Button>
            </Paper>

            {isRaportShown &&
                <Paper elevation={3} style={tableStyle}>
                    <SimpleTable expenses={expenses}/>
                </Paper>
            }
        </Container>
    )

}

function manageDates(month, year) {
    var startDate = year
    var endDate = year

    switch(month) {
        case "Styczeń":
            startDate += '-01-01'
            endDate += '-01-31'
        break;

        case "Luty":
            startDate += '-02-01'
            endDate += '-02-28'
        break;

        case "Marzec":
            startDate += '-03-01'
            endDate += '-03-31'
        break;

        case "Kwiecień":
            startDate += '-04-01'
            endDate += '-04-30'
        break;

        case "Maj":
            startDate += '-05-01'
            endDate += '-05-31'
        break;

        case "Czerwiec":
            startDate += '-06-01'
            endDate += '-06-30'
        break;

        case "Lipiec":
            startDate += '-07-01'
            endDate += '-07-31'
        break;

        case "Sierpień":
            startDate += '-08-01'
            endDate += '-08-31'
        break;

        case "Wrzesień":
            startDate += '-09-01'
            endDate += '-09-30'
        break;

        case "Październik":
            startDate += '-10-01'
            endDate += '-10-31'
        break;

        case "Listopad":
            startDate += '-11-01'
            endDate += '-11-30'
        break;

        case "Grudzień":
            startDate += '-12-01'
            endDate += '-12-31'
        break;

        default:
            startDate += '-01-01'
            endDate += '-01-31'
    }

    return [startDate, endDate]
}