import axios from 'axios';
import { JSONObject } from '../definations';
import * as Constant from "@/lib/constant";


export default async function fetchStockIndexes(): Promise<JSONObject> {

	const resultData: JSONObject[] = [];
	try {
		const dowJonesDataResponse = await fetchIndividualData(Constant.SYMBOL_DOW_JONES);
		const sp500DataResponse = await fetchIndividualData(Constant.SYMBOL_S_AND_P_500);
		const nasdaqDataResponse = await fetchIndividualData(Constant.SYMBOL_NASDAQ);

		if( dowJonesDataResponse.status == "success" 
				&& sp500DataResponse.status == "success" 
				&& nasdaqDataResponse.status == "success" 
		) {
			dowJonesDataResponse.data.displayName = "Dow Jones";
			sp500DataResponse.data.displayName = "S & P 500";
			nasdaqDataResponse.data.displayName = "NASDAQ";

			resultData.push(dowJonesDataResponse.data);
			resultData.push(sp500DataResponse.data);
			resultData.push(nasdaqDataResponse.data);

			return {status: "success", data: resultData};
		}
		
		return ({status: "error", message: "Error retrieving data."});

	} catch (error) {
		return {status: "error"};
	}
}


async function fetchIndividualData( symbol: string ): Promise<JSONObject> {
	try {
		const response = await axios.get(`/api/stock-index`, {
			params: {
				symbol: symbol
			},
		});

		return {status: "success", data: response.data};
	} catch (error) {
		return {status: "error"};
	}
}