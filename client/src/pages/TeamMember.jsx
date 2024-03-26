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
  Typography,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_USER } from "../utils/queries";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e4442b",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

export default function TeamMember() {
  // const { loading: meLoading, error: meError, data: meData } = useQuery(QUERY_ME);
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: refetchMe,
  } = useQuery(QUERY_ME);

  // const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_SINGLE_USER, {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery(QUERY_SINGLE_USER, {
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

  const {
    user: { team },
  } = userData;
  const members = team.members;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <h1>Team Members</h1>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    NAME
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    EMAIL
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    NUMBER OF ACTIVE TASKS
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {`${member.firstName} ${member.lastName}`}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {member.email}
                  </TableCell>
                  {/* <TableCell align="right">{member.tasks.length}</TableCell> */}
                  <TableCell align="center">
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
    </ThemeProvider>
  );
}
