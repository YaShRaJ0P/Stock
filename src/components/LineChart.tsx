// src/components/LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import "../chartSetup"; // Import the setup file to register components
import { StockData, StockReturn } from "@/app/types";
import "chart.js/auto";

interface LineChartProps {
  stockData: StockData[];
  stockReturns: StockReturn[];
}

const LineChart: React.FC<LineChartProps> = ({ stockData, stockReturns }) => {
  const chartData = {
    labels: stockData.map((d) => d.date),
    datasets: [
      {
        label: "Daily Returns (%)",
        data: stockReturns.map((r) => r.dailyReturn),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
