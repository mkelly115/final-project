import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_USER } from "../utils/queries";

import "../index.css";

// bullet points for styling
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MyOverview = () => {
  // Query to fetch the logged-in user's data
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);

  // Query to fetch projects
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: meData?.me?._id }, // Pass the logged-in user's ID as a variable
  });

  // Handle loading and error states
  if (meLoading || projectsLoading) return <p>Loading...</p>;
  if (meError || projectsError) return <p>Error fetching data...</p>;

  // Verify that meData and projectsData are populated
  if (
    !meData ||
    !projectsData ||
    !projectsData.user ||
    !projectsData.user.projects
  )
    return <p>No user data or projects found...</p>;

     // ------------------ start of code for projects pie chart ------------------------------

  // Map over the projects array to count the number of projects for each project status
  const projectStatusCounts = projectsData.user.projects.reduce(
    (acc, project) => {
      if (acc[project.projectStatus]) {
        acc[project.projectStatus]++;
      } else {
        acc[project.projectStatus] = 1;
      }
      return acc;
    },
    {}
  );

  // Create the data array for the project pie chart
  const projectChartData = Object.entries(projectStatusCounts).map(
    ([status, count], index) => ({
      id: `status_${status}_${index}`, // Unique ID for each status
      value: count,
      label: status,
    })
  );

  // total project count for project pie chart
  const totalProjectsCount = projectsData.user.projects.length;

  // ------------------ end of code for projects pie chart ------------------------------

   // ------------------ start of code for tasks pie chart ------------------------------

  // Map over the tasks array to count the number of tasks for each status
  const taskStatusCounts = projectsData.user.tasks.reduce((acc, task) => {
    if (acc[task.taskStatus]) {
      acc[task.taskStatus]++;
    } else {
      acc[task.taskStatus] = 1;
    }
    return acc;
  }, {});

  // Create the data array for the tasks pie chart
  const taskChartData = Object.entries(taskStatusCounts).map(
    ([status, count], index) => ({
      id: `status_${status}_${index}`, // Unique ID for each status
      value: count,
      label: status,
    })
  );

   // total tasks count for task pie chart
  const totalTasksCount = projectsData.user.tasks.length;
   // ------------------ end of code for tasks pie chart ------------------------------

  //  ------------------ start of task counts by status for gauge ------------------------------

  // count for how many tasks are imcomplete
  const incompleteTasksCount = Object.keys(taskStatusCounts)
    .filter((status) => status !== "Completed")
    .reduce((acc, status) => acc + taskStatusCounts[status], 0);

    // count for how many tasks are completed
  const completedTasksCount = taskStatusCounts.Completed || 0;

 //  ------------------ end of task counts by status for gauge ------------------------------

  // ------------------ start of code for upcoming due dates ------------------------------

  // date formatting function
  const parseFormattedDate = (formattedDate) => {
    // Split the formatted date string into parts
    const parts = formattedDate.split(" ");

    // Extract month, day, and year
    const month = parts[0];
    const day = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    // Map month back to a numeric value
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const monthNumber = months[month];

    // Create a new Date object with the extracted parts
    return new Date(year, monthNumber, day);
  };

  const today = new Date();
  console.log("Today's date:", today);

  // check if a projects due date matches today's date
  const hasDueDateToday = projectsData.user.projects.some((project) => {
    const projectDueDate = parseFormattedDate(project.dateDue);
    return projectDueDate.toDateString() === today.toDateString();
  });
  console.log(hasDueDateToday);

  if (hasDueDateToday) {
    console.log("At least one project has a due date today.");
  } else {
    console.log("No project has a due date today.");
  }

  // find the next closest due date if a date doesn't match today's date
  const closestDueDateProject = projectsData.user.projects.reduce(
    (closestProject, currentProject) => {
      const currentDueDate = parseFormattedDate(currentProject.dateDue);

      // Check if the current due date is today's date
      if (currentDueDate.toDateString() === today.toDateString()) {
        return currentProject;
      }

      if (!closestProject) {
        return currentProject;
      }

      const closestDueDate = parseFormattedDate(closestProject.dateDue);
      const isCurrentClosest =
        currentDueDate > today &&
        (currentDueDate < closestDueDate || closestDueDate <= today);

      if (isCurrentClosest) {
        return currentProject;
      }

      return closestProject;
    },
    null
  );

// return the appropriate project object based on the selected due date above (todays date or most upcoming due date)
  const projectToReturn = hasDueDateToday
    ? projectsData.user.projects.find((project) => {
        const projectDueDate = parseFormattedDate(project.dateDue);
        return projectDueDate.toDateString() === today.toDateString();
      })
    : closestDueDateProject;

// repeat the due date evaluation for the tasks array and return the appropriate task object
  const taskToReturn = () => {
    const hasDueDateToday = projectsData.user.tasks.some((task) => {
      const taskDueDate = parseFormattedDate(task.dateDue);
      return taskDueDate.toDateString() === today.toDateString();
    });

    const closestDueDateTask = projectsData.user.tasks.reduce(
      (closestTask, currentTask) => {
        const currentDueDate = parseFormattedDate(currentTask.dateDue);

        // Check if the current due date is today's date
        if (currentDueDate.toDateString() === today.toDateString()) {
          return currentTask;
        }

        if (!closestTask) {
          return currentTask;
        }

        const closestDueDate = parseFormattedDate(closestTask.dateDue);
        const isCurrentClosest =
          currentDueDate > today &&
          (currentDueDate < closestDueDate || closestDueDate <= today);

        if (isCurrentClosest) {
          return currentTask;
        }

        return closestTask;
      },
      null
    );

    return hasDueDateToday
      ? projectsData.user.tasks.find((task) => {
          const taskDueDate = parseFormattedDate(task.dateDue);
          return taskDueDate.toDateString() === today.toDateString();
        })
      : closestDueDateTask;
  };

  const taskToReturnResult = taskToReturn();
// ------------------ end of code for upcoming due dates ------------------------------

  return (
    <div>
      <div className="chart-container">
        <div className="chart-border">
          <div className="chart-header">Project Status Overview</div>
          <PieChart
            series={[
              {
                data: projectChartData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={200}
          />
          <div>Total Projects: {totalProjectsCount}</div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-border">
          <div className="chart-header">Task Status Overview</div>
          <PieChart
            series={[
              {
                data: taskChartData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={200}
          />
          <div>Total Tasks: {totalTasksCount}</div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-border">
          <div className="chart-header">
            You have {incompleteTasksCount} task
            {incompleteTasksCount === 1 ? "" : "s"} to complete
          </div>
          <div className="gauge-container">
            <Gauge
              value={completedTasksCount}
              valueMax={totalTasksCount}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-border">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {bull} UPCOMING DUE DATES {bull}
              </Typography>
              <br></br>
              <Typography sx={{ fontSize: 14 }} component="div">
                Your next TASK is due
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {taskToReturnResult &&
                parseFormattedDate(
                  taskToReturnResult.dateDue
                ).toDateString() === today.toDateString()
                  ? "TODAY"
                  : taskToReturnResult
                  ? parseFormattedDate(
                      taskToReturnResult.dateDue
                    ).toDateString()
                  : "No upcoming due date"}
              </Typography>
              <Typography sx={{ fontSize: 14 }} component="div">
                Your next PROJECT is due
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {projectToReturn &&
                parseFormattedDate(projectToReturn.dateDue).toDateString() ===
                  today.toDateString()
                  ? "TODAY"
                  : projectToReturn
                  ? parseFormattedDate(projectToReturn.dateDue).toDateString()
                  : "No upcoming due date"}
              </Typography>
            </CardContent>
            <CardActions>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  component={RouterLink}
                  to="/dashboard/calendar"
                  size="small"
                >
                  MY CALENDAR
                </Button>
              </Box>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyOverview;
