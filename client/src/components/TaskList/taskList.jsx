import { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT, QUERY_USERS } from '../../utils/queries'; 
import { ADD_TASK, UPDATE_TASK } from '../../utils/mutations';

import { useParams } from 'react-router-dom';

const TaskTable = () => {
    const { projectId } = useParams(); 
    const { loading: projectLoading, error: projectError, data: projectData } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId }, 
        fetchPolicy: 'cache-and-network'
    });

    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(QUERY_USERS); 

    const [newTask, setNewTask] = useState({
        description: '',
        taskStatus: '',
        dateDue: null, 
        assignedUserId: '' 
    });

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const [error, setError] = useState('');

    const [addTask] = useMutation(ADD_TASK);
    const [updateTaskStatus] = useMutation(UPDATE_TASK);

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
                    assignedUserId: '',
                }
            },
            refetchQueries: [{ query: QUERY_SINGLE_PROJECT, variables: { projectId } }]
        }).catch((error) => {
            console.error("Error updating task status:", error);
            setError('Error updating task status.');
        });
        setEditingTaskId(null);
        setEditedStatus('');
    };


    const handleAddRow = () => {
        if (!newTask.description || !newTask.taskStatus || !newTask.dateDue || !newTask.assignedUserId) {
            setError('All fields are required.');
            return;
        }

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
            setError('');
        }).catch((error) => {
            console.error("Error adding task:", error);
            setError('Error adding task.');
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
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectData.project.tasks.map(task => (
                            <TableRow key={task._id}>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    {editingTaskId === task._id ? (
                                        <Select
                                            value={editedStatus}
                                            onChange={(e) => setEditedStatus(e.target.value)}
                                        >
                                            <MenuItem value="Created">Created</MenuItem>
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                        </Select>
                                    ) : (
                                        task.taskStatus
                                    )}
                                </TableCell>
                                <TableCell>{task.dateDue}</TableCell>
                                <TableCell>
                                    {task.assignedUser ? `${task.assignedUser.firstName} ${task.assignedUser.lastName}` : 'Not Assigned'}
                                </TableCell>
                                <TableCell>
                                    {editingTaskId === task._id ? (
                                        <Button variant="contained" color="primary" onClick={() => handleSaveClick(task._id, task.description, task.assignedUserId)}>Save</Button>
                                        ) : (
                                            <Button variant="contained" color="primary" onClick={() => handleEditClick(task._id, task.taskStatus)}>Edit</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>
                                    <TextField name="description" value={newTask.description} onChange={handleInputChange} />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={newTask.taskStatus}
                                        onChange={(e) => setNewTask({ ...newTask, taskStatus: e.target.value })}
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

                            <TableRow>
                                <TableCell colSpan={5}>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    };
    
    export default TaskTable;
    

