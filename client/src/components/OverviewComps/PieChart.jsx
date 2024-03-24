import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_SINGLE_USER } from "../../utils/queries";

import "./header.css";

const TasksChart = () => {
    // Query to fetch the logged-in user's data
    const {
        loading: meLoading,
        error: meError,
        data: meData,
      } = useQuery(QUERY_ME);
    
      // Query to fetch projects
      const { loading, error, data: tasksData } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: meData?.me?._id }, // Pass the logged-in user's ID as a variable
      });
      console.log(tasksData.user.tasks);
    
      // Handle loading and error states
      if (meLoading || loading) return <p>Loading...</p>;
      if (meError || error) return <p>Error fetching data...</p>;
    
      // Verify that meData and tasksData are populated
      if (!meData || !tasksData || !tasksData.user || !tasksData.user.tasks) return <p>No user data or projects found...</p>;
    
    // Map over the projects array to count the number of projects for each status
    const taskStatusCounts = tasksData.user.tasks.reduce((acc, task) => {
        if (acc[task.taskStatus]) {
            acc[task.taskStatus]++;
        } else {
            acc[task.taskStatus] = 1;
        }
        return acc;
    }, {});

    // Create the data array for the pie chart
    const chartData = Object.entries(taskStatusCounts).map(([status, count], index) => ({
        id: `status_${status}_${index}`, // Unique ID for each status
        value: count,
        label: status,
    }));

    const totalCount = tasksData.user.tasks.length;

    return (
        <div className="chart-container">
        <div className="chart-border">
          <div className="chart-header">Task Status Overview</div>
          <PieChart
            series={[
              {
                data: chartData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            height={200}
          />
          <div>Total Projects: {totalCount}</div>
        </div>
      </div>
    );
  };


export default TasksChart;