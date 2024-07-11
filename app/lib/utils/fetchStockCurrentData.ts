import { processStockData } from '@/lib/utils/processStockData';
import axios from 'axios';
import { JSONObject } from '../definations';

export default async function fetchStockCurrentData(exchange: string): Promise<JSONObject> {

	try {
		const response = await axios.get(`/api/current-stock-data`, {
			params: {
				exchange
			},
		});

		return {status: "success", data: processStockData(response.data)};
	} catch (error) {
		console.error('Error fetching stock data:', error);
		return {status: "error"};
	}
}