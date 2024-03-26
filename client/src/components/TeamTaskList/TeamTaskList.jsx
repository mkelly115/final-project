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
      main: "#e4442b"
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const TeamTaskList = ({ tasks }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ width: "100%", marginBottom: "1rem", borderRadius: 1, boxShadow: 3 }}>
        <Table aria-label="task table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  Description
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  Status
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                  Due Date
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>
                  <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                    {task.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                    {task.taskStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                    {task.dateDue}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default TeamTaskList;