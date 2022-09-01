import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Expense from './Expense';
import List from './List';
import Report from './Report';

export default function Appbar() {

    const [isListShown, setShowList] = React.useState(true);
    const [isAddShown, setShowAdd] = React.useState(false);
    const [isReportShown, setShowReport] = React.useState(false);

    const showList = () => {
        setShowList(true);
        setShowAdd(false);
        setShowReport(false);
    }
    const showAdd = () => {
        setShowList(false);
        setShowAdd(true);
        setShowReport(false);
    }
    const showRaport = event => {
        setShowList(false);
        setShowAdd(false);
        setShowReport(true);
    }

    return (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  ExpensesManager
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  <Button 
                      variant="contained"
                      sx={{ margin: "20px", width: 150 }}
                      onClick={showList}>
                      Pokaż wydatki
                  </Button>
                  <Button 
                      variant="contained"
                      sx={{ margin: "20px", width: 150 }}
                      onClick={showAdd}>
                      Dodaj wydatek
                  </Button>
                  <Button 
                      variant="contained"
                      sx={{ margin: "20px", width: 150 }}
                      onClick={showRaport}>
                      Generuj raport
                  </Button>
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <div>
            {isAddShown && <Expense/>}
          </div>
          <div>
            {isListShown && <List/>}
          </div>
          <div>
            {isReportShown && <Report/>}
          </div>
        </div>
    );
}
