import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../../utils/queries';
import { useParams } from 'react-router-dom';

const TaskTable = () => {
    const { projectId } = useParams(); 
    const { loading, error, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId }, 
        fetchPolicy: 'cache-and-network'
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data)
    if (!data || !data.project || data.project.length === 0) {
      return <p>No Tasks found.</p>;
    }

    return (
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
                    {data.project.tasks.map(task => (
                        <TableRow key={task.description}>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.taskStatus}</TableCell>
                            <TableCell>{task.dateDue}</TableCell>
                            <TableCell>{`${task.assignedUser.firstName} ${task.assignedUser.lastName}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;