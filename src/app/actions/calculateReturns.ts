import { StockData, StockReturn } from "../types";

export const calculateReturns = (stockData: StockData[]): StockReturn[] => {
    // Handle cases where there are fewer than 2 entries
    if (stockData.length < 2) {
        return [];
    }

    // Ensure stockData is sorted by date
    const sortedData = [...stockData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate daily returns
    const returns: StockReturn[] = sortedData.slice(1).map((data, index) => {
        const previousData = sortedData[index];

        // Handle cases where price might be undefined
        if (previousData.price === undefined || data.price === undefined) {
            throw new Error('Price data is missing');
        }

        const previousPrice = previousData.price;
        const dailyReturn = ((data.price - previousPrice) / previousPrice) * 100;

        // Return the StockReturn object with ticker included
        return {
            date: data.date,
            ticker: data.ticker,
            dailyReturn: parseFloat(dailyReturn.toFixed(2)), // Format to 2 decimal places
        };
    });

    return returns;
};
