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

