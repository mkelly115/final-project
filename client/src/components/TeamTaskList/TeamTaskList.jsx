/* eslint-disable react/prop-types */
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#d7c7bc",
      // main: "#c55a48",
      main: "#e4442b"
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TeamTaskList = ({ tasks }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ width: "75%", marginBottom: "1rem", borderRadius: 1, boxShadow: 3 }}>
        <Table sx={{ width: "100%" }} aria-label="task table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                  Description
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                  Status
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
                  Due Date
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task._id}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" component="div" gutterBottom>
                    {task.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" component="div" gutterBottom>
                    {task.taskStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" component="div" gutterBottom>
                    {task.dateDue}
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default TeamTaskList;
