import "../TaskList/TaskList.css"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"; // Import styled, createTheme, and ThemeProvider from MUI
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  QUERY_SINGLE_PROJECT,
  QUERY_USERS,
  QUERY_SINGLE_USER,
  QUERY_ME,
} from "../../utils/queries";
import { ADD_TASK, UPDATE_TASK } from "../../utils/mutations";

import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e4442b",
    },
    action: {
      hover: "#f5f5f5",
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

const SmallScreenTable = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    overflowX: "auto",
  },
}));

const TaskTable = () => {
  const client = useApolloClient();
  const { projectId } = useParams();
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
    refetch: refetchProject,
  } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(QUERY_USERS);

  const [newTask, setNewTask] = useState({
    description: "",
    taskStatus: "",
    dateDue: null,
    assignedUserId: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [error, setError] = useState("");

  const [addTask] = useMutation(ADD_TASK, {
    onCompleted: () => {
      // Refetch the queries after adding a task
      refetchQueries();
    },
  });
  const [updateTaskStatus] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      // Refetch the queries after updating a task
      refetchQueries();
    },
  });

  const refetchQueries = () => {
    // Refetch the QUERY_ME and QUERY_SINGLE_USER queries
    meRefetch();
    projectsRefetch();
  };

  // Use the useQuery hook for QUERY_ME and QUERY_SINGLE_USER
  // Use the refetch functions provided by useQuery
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: meRefetch,
  } = useQuery(QUERY_ME);
  const {
    loading: projectsLoading,
    error: projectsError,
    // data: projectsData,
    refetch: projectsRefetch,
  } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: meData?.me?._id },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAssignedUserChange = (e) => {
    setNewTask({
      ...newTask,
      assignedUserId: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setNewTask({
      ...newTask,
      dateDue: date,
    });
  };

  const handleEditClick = (taskId, currentStatus) => {
    setEditingTaskId(taskId);
    setEditedStatus(currentStatus);
  };

  const handleSaveClick = (taskId, currentDescription) => {
    updateTaskStatus({
      variables: {
        taskId: taskId,
        input: {
          taskStatus: editedStatus,
          description: currentDescription,
          assignedUserId: "",
        },
      },
      refetchQueries: [
        { query: QUERY_SINGLE_PROJECT, variables: { projectId } },
      ],
    }).catch((error) => {
      console.error("Error updating task status:", error);
      setError("Error updating task status.");
    });
    setEditingTaskId(null);
    setEditedStatus("");
    client.writeQuery({
      query: QUERY_SINGLE_PROJECT,
      variables: { projectId },
      data: {
        project: {
          ...projectData.project,
          tasks: projectData.project.tasks.map((task) =>
            task._id === taskId
              ? { ...task, taskStatus: editedStatus, description: currentDescription }
              : task
          ),
        },
      },
    });
  };

  const handleAddRow = () => {
    if (
      !newTask.description ||
      !newTask.taskStatus ||
      !newTask.dateDue ||
      !newTask.assignedUserId
    ) {
      setError("All fields are required.");
      return;
    }

    addTask({
      variables: {
        projectId: projectId,
        input: {
          description: newTask.description,
          taskStatus: newTask.taskStatus,
          dateDue: newTask.dateDue ? newTask.dateDue.toISOString() : null,
          assignedUserId: newTask.assignedUserId,
        },
      },
    })
      .then(() => {
        // Refetch project data to update the chart
        refetchProject();
        setNewTask({
          description: "",
          taskStatus: "",
          dateDue: null,
          assignedUserId: "",
        });
        setError("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setError("Error adding task.");
      });
    client.writeQuery({
      query: QUERY_SINGLE_PROJECT,
      variables: { projectId },
      data: {
        project: {
          ...projectData.project,
          tasks: [...projectData.project.tasks, newTask],
        },
      },
    });
  };

  if (meLoading || projectsLoading) return <p>Loading...</p>;
  if (meError || projectsError) return <p>Error fetching data...</p>;

  if (projectLoading || usersLoading) return <p>Loading...</p>;
  if (projectError) return <p>Error: {projectError.message}</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;

  if (
    !projectData ||
    !projectData.project ||
    projectData.project.length === 0
  ) {
    return <p>No Tasks found.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <SmallScreenTable component={Paper} sx={{ width: "100%", marginBottom: "1rem", borderRadius: 1, boxShadow: 3, overflowX: "auto" }}>
          <Table aria-label="task table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Task
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
                <StyledTableCell>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Assigned User
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Edit
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {projectData.project.tasks.map((task) => (
                <StyledTableRow key={task._id}>
                  <TableCell>
                    <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                      {task.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                      {editingTaskId === task._id ? (
                        <Select
                          value={editedStatus}
                          onChange={(e) => handleInputChange(e)}
                        >
                          <MenuItem value="Created">Created</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      ) : (
                        task.taskStatus
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                      {task.dateDue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="div" sx={{ fontSize: "0.9rem" }}>
                      {task.assignedUser
                        ? `${task.assignedUser.firstName} ${task.assignedUser.lastName}`
                        : "Not Assigned"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {editingTaskId === task._id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleSaveClick(
                            task._id,
                            task.description,
                            task.assignedUserId
                          )
                        }
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleEditClick(task._id, task.taskStatus)
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow>
                <TableCell>
                  <TextField
                    name="description"
                    value={newTask.description}
                    onChange={(e) => handleInputChange(e)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newTask.taskStatus}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <MenuItem value="Created">Created</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <DatePicker
                    selected={newTask.dateDue}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    isClearable
                    placeholderText="Click to select a date"
                    className="custom-datepicker"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newTask.assignedUserId}
                    onChange={(e) => handleAssignedUserChange(e)}
                    name="assignedUserId"
                  >
                    {usersData.users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {`${user.firstName} ${user.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#e4442b" }}
                    onClick={handleAddRow}
                  >
                    Add Task
                  </Button>
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell colSpan={5}>
                  {error && <Typography variant="body1" component="p" sx={{ color: "red" }}>{error}</Typography>}
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </SmallScreenTable>
      </div>
    </ThemeProvider>
  );
};

export default TaskTable;



