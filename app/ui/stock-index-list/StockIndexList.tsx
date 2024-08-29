'use client';

import React from 'react';
import useStockData from '@/lib/hooks/useStockData';
import * as Constant from "@/lib/constant";
import { JSONObject } from '@/lib/definations';
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndex from './StockIndex';
import Loading from '../layout/Loading';


export default function StockIndexList({ symbols, handleOnItemClick }: { symbols: string[], handleOnItemClick: (item: JSONObject) => void }) {

	const { stockPriceList, isLoading } = useStockData(symbols);

	if (isLoading) return <Loading />
	
	return (
		<div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
			{stockPriceList.map((stock: JSONObject) => {
				return (<StockIndex
					key={stock.symbol}
					stockData={stock}
				/>)
			})}
		</div>
	);
};
