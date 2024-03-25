import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c55a48 ',
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
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table aria-label="task table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body1">No tasks available.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <StyledTableRow key={task._id}>
                  <TableCell component="th" scope="row">
                    {task.description}
                  </TableCell>
                  <TableCell>{task.taskStatus}</TableCell>
                  <TableCell>{task.dateDue}</TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default TeamTaskList;