import { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT, QUERY_USERS } from '../../utils/queries'; 
import { ADD_TASK } from '../../utils/mutations';
import { useParams } from 'react-router-dom';

const TaskTable = () => {
    const { projectId } = useParams(); 
    const { loading: projectLoading, error: projectError, data: projectData } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId }, 
        fetchPolicy: 'cache-and-network'
    });

    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(QUERY_USERS); // Query to fetch users

    const [newTask, setNewTask] = useState({
        description: '',
        taskStatus: '',
        dateDue: null, 
        assignedUserId: '' 
    });

    const [addTask] = useMutation(ADD_TASK);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    };

    const handleAssignedUserChange = (e) => {
        setNewTask({
            ...newTask,
            assignedUserId: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setNewTask({
            ...newTask,
            dateDue: date
        });
    };

    const handleAddRow = () => {
        addTask({
            variables: {
                projectId: projectId,
                input: {
                    description: newTask.description,
                    taskStatus: newTask.taskStatus,
                    dateDue: newTask.dateDue ? newTask.dateDue.toISOString() : null, 
                    assignedUserId: newTask.assignedUserId 
                }
            },
            refetchQueries: [{ query: QUERY_SINGLE_PROJECT, variables: { projectId } }]
        }).then(() => {
            setNewTask({
                description: '',
                taskStatus: '',
                dateDue: null,
                assignedUserId: ''
            });
        }).catch((error) => {
            console.error("Error adding task:", error);
        });
    };

    if (projectLoading || usersLoading) return <p>Loading...</p>;
    if (projectError) return <p>Error: {projectError.message}</p>;
    if (usersError) return <p>Error: {usersError.message}</p>;

    if (!projectData || !projectData.project || projectData.project.length === 0) {
      return <p>No Tasks found.</p>;
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="task table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Assigned User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectData.project.tasks.map(task => (
                            <TableRow key={task.description}>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.taskStatus}</TableCell>
                                <TableCell>{task.dateDue}</TableCell>
                                <TableCell>
                                    {task.assignedUser ? `${task.assignedUser.firstName} ${task.assignedUser.lastName}` : 'Not Assigned'}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField name="description" value={newTask.description} onChange={handleInputChange} />
                            </TableCell>
                            <TableCell>
                                <TextField name="taskStatus" value={newTask.taskStatus} onChange={handleInputChange} />
                            </TableCell>
                            <TableCell>
                                <DatePicker
                                    selected={newTask.dateDue}
                                    onChange={handleDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    placeholderText="Click to select a date"
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={newTask.assignedUserId}
                                    onChange={handleAssignedUserChange}
                                    name="assignedUserId"
                                >
                                    {usersData.users.map(user => (
                                        <MenuItem key={user._id} value={user._id}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={handleAddRow}>Add Task</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TaskTable;