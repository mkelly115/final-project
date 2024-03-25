return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* Welcome Card */}
        <div className="chart-container">
          <div className="chart-border">
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Welcome to your project dashboard, {meData.me.firstName}!
                </Typography>
                <br />
                <Typography variant="body1" component="div">
                  Get an overview of your projects and tasks.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        {/* Upcoming Due Dates Card */}
        <div className="chart-container">
          <div className="chart-border">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {bull} UPCOMING DUE DATES {bull}
                </Typography>
                <br />
                <Typography sx={{ fontSize: 14 }} component="div">
                  Your next TASK is due
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {/* Task due date */}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="div">
                  Your next PROJECT is due
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {/* Project due date */}
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
      </Grid>
      <Grid item xs={12}>
        {/* Tasks Gauge */}
        <div className="chart-container">
          <div className="chart-border">
            <div className="chart-header">Task Status Overview</div>
            {/* Tasks Pie Chart */}
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
      </Grid>
      <Grid item xs={12}>
        {/* Projects Pie Chart */}
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
      </Grid>
      <Grid item xs={12}>
        {/* Gauge */}
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
      </Grid>
    </Grid>
  );
  