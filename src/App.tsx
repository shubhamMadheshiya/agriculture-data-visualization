import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import DataTable from "./components/DataTable";
import BarChart from "./components/BarChart";
import { parseDataTable, parseBarChartData } from "./services/dataParser"; // Data parsing functions for table and chart data
import dataset from "./data/Dataset.json"; // Import dataset for visualization

const App = () => {
  // Parse the data for table and bar chart
  const tableData = parseDataTable(dataset); // Parse data to get aggregated max/min crops by year
  const barChartData = parseBarChartData(dataset); // Parse data to get average yield of crops

  return (
    <MantineProvider>
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "skyblue" }}>Agriculture Data Visualization</h1>
        <h2>Production Data by Year</h2>
        <DataTable data={tableData} />

        <h2>Average Yield of Crops</h2>
        <BarChart data={barChartData} />
      </div>
    </MantineProvider>
  );
};

export default App;
