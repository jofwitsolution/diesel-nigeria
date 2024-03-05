"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// [
//   650000, 500009, 800000, 810000, 560000, 550000, 400000,
//   700000, 900000, 600000, 750000, 850000,
// ]

const PaymentChart: React.FC = ({ chartData }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Payments",
                data: chartData, // Replace with your payment data
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
                tension: 0.4, // Adjust the tension to control the curve (0 is straight lines, 1 is very curved)
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Clean up on component unmount
      }
    };
  }, []);

  return <canvas ref={chartRef} style={{ width: "100%", height: "auto" }} />;
};

export default PaymentChart;
