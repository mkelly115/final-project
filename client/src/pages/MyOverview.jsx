import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useQuery } from '@apollo/client';
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
      const { loading, error, data: projectsData } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: meData?.me?._id }, // Pass the logged-in user's ID as a variable
      });
    
      // Handle loading and error states
      if (meLoading || loading) return <p>Loading...</p>;
      if (meError || error) return <p>Error fetching data...</p>;
    
      // Verify that meData and projectsData are populated
      if (!meData || !projectsData || !projectsData.user || !projectsData.user.projects) return <p>No user data or projects found...</p>;
    
    // Map over the projects array to count the number of projects for each status
    const projectStatusCounts = projectsData.user.projects.reduce((acc, project) => {
        if (acc[project.projectStatus]) {
            acc[project.projectStatus]++;
        } else {
            acc[project.projectStatus] = 1;
        }
        return acc;
    }, {});

    // Create the data array for the pie chart
    const chartData = Object.entries(projectStatusCounts).map(([status, count], index) => ({
        id: `status_${status}_${index}`, // Unique ID for each status
        value: count,
        label: status,
    }));

    const totalCount = projectsData.user.projects.length;

    return (
        <div className="chart-container">
        <div className="chart-border">
          <div className="chart-header">Project Status Overview</div>
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


export default MyOverview;