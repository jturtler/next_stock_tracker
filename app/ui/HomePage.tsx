'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './stock-index-data/StockChart';
import * as Constant from "@/lib/constant";
import { useMainUi } from '@/contexts/MainUiContext';
import { JSONObject } from '@/lib/definations';
import StockIndexDetails from './stock-index-data/StockIndexDetails';
import StockIndexList from './stock-index-list/StockIndexList';
import SearchStock from './stock-index-list/SearchStock';
import { fetchIndividualData } from '@/lib/utils/fetchStockIndexes';
import * as AppStore from "@/lib/AppStore";

export default function HomePage() {

	const { mainPage, setMainPage, setSubPage } = useMainUi();
	const [selectedStock, setSelectedStock] = useState<JSONObject | null>(null);

	const addItem = async (data: JSONObject) => {
		const response = await fetchIndividualData(data.symbol);
		if (response.status == "success") {
			AppStore.setSelectedSymbolData(response.data[0]);
			setMainPage(Constant.UI_SYMBOL_DETAILS);
			setSubPage(Constant.UI_CHART);
			setSelectedStock(response.data[0]);
		}
	}

	return (
		<>
			{selectedStock === null && <>
				<SearchStock handleOnItemSelect={(stockData) => addItem(stockData)} handleOnClose={() => { }} />
				<StockIndexList handleOnItemClick={(item) => AppStore.setSelectedSymbolData(item)} />
			</>}
		</>
	);
};