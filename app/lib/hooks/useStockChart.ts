// hooks/useStockData.ts

import useSWR from 'swr';
import fetchStockChartData from '@/lib/utils/fetchStockChartData';

const fetcher = (symbol: string, periodName: string) => fetchStockChartData(symbol, periodName);

const useStockChartData = (symbol: string, periodName: string) => {
	const { data, error } = useSWR({symbol, periodName}, fetcher, {
		refreshInterval: 1 * 60 * 1000, // Fetch data every 5 minutes
	});
	
	return {
		chartData: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useStockChartData;
