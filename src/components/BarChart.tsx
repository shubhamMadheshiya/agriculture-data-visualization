import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Define the type for the props
type Props = {
  data: { cropName: string; averageYield: number }[]; // Expected data format
};

const BarChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null); // Reference to the chart container

  // useEffect hook to initialize and update the ECharts instance
  useEffect(() => {
    // Check if chartRef has a valid element to render
    const chart = echarts.init(chartRef.current!); // Initialize the ECharts instance

    // Set chart options
    chart.setOption({
      xAxis: {
        type: "category", // Category axis for crop names
        data: data.map((item) => item.cropName), // Map crop names to x-axis labels
      },
      yAxis: {
        type: "value", // Value axis for average yield
        name: "Average Yield (Kg/Ha)", // Label for the y-axis
      },
      series: [
        {
          data: data.map((item) => item.averageYield), // Map average yields to bar data
          type: "bar", // Bar chart type
        },
      ],
    });

    // Cleanup function to dispose of the chart when component unmounts
    return () => {
      chart.dispose(); // Dispose of the chart to free resources
    };
  }, [data]); // Re-run effect when data changes

  return <div ref={chartRef} style={{ width: "100%", height: 800 }} />; // Render the chart container with dynamic width and fixed height
};

export default BarChart;
