// hooks/useStockData.ts

import useSWR from 'swr';
import fetchStockData from '@/lib/utils/fetchStockIndexes';

const fetcher = (symbols: string[]) => fetchStockData(symbols);

const useStockData = (symbols: string[]) => {
	const { data, error } = useSWR(symbols, fetcher, {
		refreshInterval: 1 * 10 * 1000, // Fetch data every 5 minutes
	});
	
	return {
		stockDataList: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useStockData;
