import React from "react";
import { Line } from "react-chartjs-2";
import "../chartSetup";
import { StockData, StockReturn } from "@/app/types";
import "chart.js/auto";
import { TooltipItem, ChartData, ChartOptions } from "chart.js";

interface LineChartProps {
  stockData: StockData[];
  stockReturns: StockReturn[];
}

const LineChart: React.FC<LineChartProps> = ({ stockData, stockReturns }) => {
  const chartData: ChartData<"line", number[]> = {
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

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            `${context.dataset.label}: ${context.raw}%`,
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
