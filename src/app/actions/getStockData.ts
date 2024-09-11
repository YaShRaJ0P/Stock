import axios from 'axios';
import { StockData } from '../types';

export const getStockData = async (ticker: string, startDate: string, endDate: string): Promise<StockData[]> => {
    try {
        console.log("hi")
        const response = await axios.get('/api/stockData'); 
        console.log(response)
        // Filter stock data by ticker and date range
        const stockData: StockData[] = response.data.filter((row: StockData) => {
            return (
                row.ticker === ticker &&
                row.date >= startDate &&
                row.date <= endDate
            );
        });

        return stockData;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
};
