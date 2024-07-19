'use client';

import useSWR from 'swr';
import fetchStockChartData from '@/lib/utils/fetchStockChartData';
import { JSONObject } from '../definations';
import { useEffect } from 'react';
import * as Utils from "@/lib/utils";


const fetcher = ({ symbol, periodName }: { symbol: string, periodName: string }) =>  axios.get(`/api/stock-chart-data`, {
	params: {
		"symbol": symbol,
		"startDate": options.startDate,
		"endDate": options.endDate,
		"interval": options.interval
	},
});

const useStockChartData = (symbol: string, periodName: string) => {
	const { data, error, isValidating, mutate } = useSWR({ symbol, periodName }, fetcher, {
		refreshInterval: 5 * 1000, // Fetch data every 5 minutes
	});
	let chartData: JSONObject[] = [];
	let errMsg = "";
	if (data != undefined) {
		if (data!.status !== "success") {
			chartData = Utils.cloneJSONObject(data.data);
		}
		else {
			errMsg = `Error while fetching stock details data. ${data.message}`;
		}
	}

console.log(chartData);
	useEffect(() => {
		// Return a cleanup function to stop revalidation by calling mutate 
		return () => {
			mutate(undefined, false); // Stop revalidation on unmount
		};
	}, [mutate]);
	
	return {
		chartData,
		errMsg,
		isLoading: !error && !data, isValidating,
		dateTimeStamp: new Date().getTime()
	};
};

export default useStockChartData;
