import { useEffect } from "react";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_USER } from "../utils/queries";

export default function TeamMember() {
  // const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { loading: meLoading, error: meError, data: meData, refetch: refetchMe } = useQuery(QUERY_ME);

  // const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_SINGLE_USER, {
    const { loading: userLoading, error: userError, data: userData, refetch: refetchUser } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: meData?.me?._id },
    skip: !meData, // Skip the query if meData is not yet available
  });

  useEffect(() => {
    refetchMe();
    refetchUser();
  }, [refetchMe, refetchUser]);

  if (meLoading || userLoading) return <p>Loading...</p>;
  if (meError) return <p>Error: {meError.message}</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  const { user: {team} } = userData;
  const members = team.members

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <h1>Team Members</h1>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">NUMBER OF ACTIVE TASKS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${member.firstName} ${member.lastName}`}
                </TableCell>
                <TableCell align="right">{member.email}</TableCell>
                {/* <TableCell align="right">{member.tasks.length}</TableCell> */}
                <TableCell align="right">
                  <Badge badgeContent={member.tasks.length} color="primary">
                    <FormatListBulletedIcon color="action" />
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
