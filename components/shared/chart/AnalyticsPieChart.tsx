"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface CircleProps {
  volume: number;
  branches: number;
  diesel: number;
}

const AnalyticsPieChart: React.FC<CircleProps> = ({
  volume,
  branches,
  diesel,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: ["Volume", "Branches", "Diesel"],
          datasets: [
            {
              data: [volume, branches, diesel],
              backgroundColor: ["green", "yellow", "red"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows chart to adjust to container size
        },
      });
    } else {
      // Update chart data
      chartInstance.current.data.datasets[0].data = [volume, branches, diesel];
      chartInstance.current.update();
    }
  }, [volume, branches, diesel]);

  return <canvas ref={chartRef}></canvas>;
};

export default AnalyticsPieChart;
