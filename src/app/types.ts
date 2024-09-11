// app/types.ts
export interface StockData {
    date: string;
    price: number;
    ticker: string;
}

export interface StockReturn {
    date: string;
    ticker: string;
    dailyReturn: number;
}

export interface CsvRow {
    Date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    ticker: string;
}

