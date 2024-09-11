// app/actions/calculateReturns.ts
import { StockData, StockReturn } from '../app/types';

export const calculateReturns = (stockData: StockData[]): StockReturn[] => {
    // Ensure stockData is sorted by date
    stockData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate daily returns
    const returns: StockReturn[] = [];

    for (let i = 1; i < stockData.length; i++) {
        const previousDay = stockData[i - 1];
        const currentDay = stockData[i];

        const dailyReturn = ((currentDay.price - previousDay.price) / previousDay.price) * 100;
        returns.push({
            date: currentDay.date,
            ticker: currentDay.ticker,
            dailyReturn: parseFloat(dailyReturn.toFixed(2)), // Format to 2 decimal places
        });
    }

    return returns;
};
