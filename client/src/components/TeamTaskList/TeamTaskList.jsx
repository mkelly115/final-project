import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      primary: {
        main: '#a6d8aa', 
      },
    },
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));




const TeamTaskList = ({ tasks }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task._id}>
                <TableCell component="th" scope="row">
                  {task.description}
                </TableCell>
                <TableCell>{task.taskStatus}</TableCell>
                <TableCell>{task.dateDue}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default TeamTaskList;