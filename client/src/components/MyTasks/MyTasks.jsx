import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_TASKS } from "../../utils/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#E4442B',
    },
  },
});

// StyledTableCell and StyledTableRow components for custom styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  [theme.breakpoints.down('sm')]: {
    padding: "8px", // Reduce padding for smaller screens
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MyTaskList = () => {
  const { loading: meLoading, error: meError, data: meData, refetch: refetchMe } = useQuery(QUERY_ME);
  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: refetchTask } =
    useQuery(QUERY_TASKS);

  useEffect(() => {
    refetchMe();
    refetchTask();
  }, [refetchMe, refetchTask]);

  if (meLoading || tasksLoading) return <p>Loading...</p>;
  if (meError || tasksError) return <p>Error fetching data...</p>;
  if (!meData || !tasksData || !tasksData.tasks)
    return <p>No user data or tasks found...</p>;

  const userTasks = tasksData.tasks;

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table aria-label="task table">
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
                <TableCell>
                  <Typography variant="body1">{task.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{task.taskStatus}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{task.dateDue}</Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default MyTaskList;