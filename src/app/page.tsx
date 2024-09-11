"use client";

import { useState } from "react";
import { getStockData } from "./actions/getStockData";
import { calculateReturns } from "./actions/calculateReturns";
import { StockData, StockReturn } from "./types";
import LineChart from "@/components/LineChart";

export default function StockPage() {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [stockReturns, setStockReturns] = useState<StockReturn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch stock data from CSV
      const data = await getStockData(ticker, "2023-01-10", "2023-02-13");

      if (data.length === 0) {
        setError("No data available for the specified range.");
        return;
      }

      setStockData(data); 

      const returns = calculateReturns(data);
      setStockReturns(returns);
    } catch (e) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <input
          className="border p-2"
          type="text"
          placeholder="Enter stock ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white"
          onClick={fetchData}
          disabled={!ticker || loading}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}

      {/* Display stock data */}
      {stockData.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Stock Prices</h2>
          <ul>
            {stockData.map((data, index) => (
              <li key={index}>
                {data.date}: ${data.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display chart of daily returns */}
      {stockReturns.length > 0 && (
        <div>
          <LineChart stockData={stockData} stockReturns={stockReturns} />
        </div>
      )}
    </div>
  );
}
