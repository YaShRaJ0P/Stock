import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import { StockData } from '../types';

const filePath = path.join(process.cwd(), 'src', 'app', 'Stock_Prices.csv');

export async function GET() {
    try {
        const csvFile = fs.readFileSync(filePath, 'utf8');

        console.log(csvFile)
        const parsedData = Papa.parse(csvFile, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });
        const stockData: StockData[] = parsedData.data.map((row: any) => ({
            date: row['Date'],
            price: row['close'],
            ticker: row['ticker'],
        }));

        return NextResponse.json(stockData);
    } catch (error) {
        console.error('Error reading stock data CSV:', error);
        return NextResponse.json({ error: 'Error reading stock data' }, { status: 500 });
    }
}
