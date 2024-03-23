import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TASKS } from "../../utils/queries";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
      primary: {
        main: '#a6d8aa', // Set primary color to #a6d8aa
      },
    },
  });
  
  // StyledTableCell and StyledTableRow components for custom styling
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

const MyTaskList = () => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(
    QUERY_ME
  );

  const { loading: tasksLoading, error: tasksError, data: tasksData } =
    useQuery(QUERY_TASKS);

  if (meLoading || tasksLoading) return <p>Loading...</p>;
  if (meError || tasksError) return <p>Error fetching data...</p>;
  if (!meData || !tasksData || !tasksData.tasks)
    return <p>No user data or tasks found...</p>;

const userTasks = tasksData.tasks;

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
        {userTasks.map((task) => (
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

export default MyTaskList;