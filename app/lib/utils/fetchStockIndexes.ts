import axios from 'axios';
import { JSONObject } from '../definations';
import * as Constant from "@/lib/constant";


export default async function fetchStockIndexes(symbols: string[]): Promise<JSONObject> {
	try {
		// const arrSymbols = [Constant.SYMBOL_DOW_JONES, Constant.SYMBOL_S_AND_P_500, Constant.SYMBOL_NASDAQ ];
		const dataList = await fetchIndividualData( symbols.join(",") );

		return {status: "success", data: dataList.data};
	} catch (error) {
		return {status: "error"};
	}
}


export async function fetchIndividualData( symbols: string ): Promise<JSONObject> {
	try {
		const response = await axios.get(`/api/stock-index`, {
			params: {
				symbols: symbols
			},
		});

		return {status: "success", data: response.data};
	} catch (error) {
		return {status: "error"};
	}
}