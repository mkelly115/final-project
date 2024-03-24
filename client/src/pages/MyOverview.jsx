import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_USER } from "../utils/queries";

import "../index.css";

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

  // Map over the projects array to count the number of projects for each status
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

  const totalProjectsCount = projectsData.user.projects.length;

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

  const totalTasksCount = projectsData.user.tasks.length;

  const incompleteTasksCount = Object.keys(taskStatusCounts)
    .filter((status) => status !== "Completed")
    .reduce((acc, status) => acc + taskStatusCounts[status], 0);

  const completedTasksCount = taskStatusCounts.Completed || 0;

  const today = new Date();
  console.log("Today's date:", today);
  
  const closestDueDateProject = projectsData.user.projects.reduce(
    (closestProject, currentProject) => {
      const currentDueDate = new Date(currentProject.dateDue);
      console.log(
        `Project: ${currentProject.projectName}, Due Date: ${currentDueDate}`
      );
      if (
        (!closestProject ||
          (currentDueDate > today && currentDueDate < new Date(closestProject.dateDue))) &&
          currentDueDate > today
      ) {
        return currentProject;
      }
      return closestProject;
    },
    null
  );
  
  console.log("Closest Due Date Project:", closestDueDateProject);

  console.log(projectsData.user.projects);


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
            You have {incompleteTasksCount} tasks to complete
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
    </div>
  );
};

export default MyOverview;
