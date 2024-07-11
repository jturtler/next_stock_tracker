import { processStockData } from '@/lib/utils/processStockData';
import axios from 'axios';
import { JSONObject } from '../definations';

/**
 * 
 * @param symbol 
Dow Jones Industrial Average (DJIA) --- Symbol: DJIA
S&P 500 --- Symbol: SPX
NASDAQ Composite --- Symbol: IXIC
Russell 2000e --- Symbol: RUT
S&P 100e --- Symbol: OEX
NYSE Compositee --- Symbol: NYA
FTSE 100 (UK) --- Symbol: FTSE
DAX (Germany) --- Symbol: GDAXI
CAC 40 (France) --- Symbol: FCHI
Nikkei 225 (Japan) --- Symbol: N225
Hang Seng Index (Hong Kong) --- Symbol: HSI
Shanghai Composite Index (China) --- Symbol: SSEC
S&P/TSX Composite (Canada) --- Symbol: GSPTSE

*/

export default async function fetchData(symbol: string): Promise<JSONObject> {

	try {
		const response = await axios.get(`/api/stock`, {
			params: {
				symbol,
				interval: "5min", // Change this as needed,
				outputsize: "full"
			},
		});

		return {status: "success", data: processStockData(response.data)};
	} catch (error) {
		console.error('Error fetching stock data:', error);
		return {status: "error"};
	}
}

// function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo