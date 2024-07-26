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
import CountryList from './stock-index-list/CountryList';


export default function HomePage() {

	const { mainPage, setMainPage, setSubPage } = useMainUi();
	const [selectedStock, setSelectedStock] = useState<JSONObject | null>(null);
	const [symbolList, setSymbolList] = useState<string[]>([]);

	const addItem = async (data: JSONObject) => {
		const response = await fetchIndividualData(data.symbol);
		if (response.status == "success") {
			AppStore.setSelectedSymbolData(response.data[0]);
			setMainPage(Constant.UI_SYMBOL_DETAILS);
			setSubPage(Constant.UI_CHART);
			setSelectedStock(response.data[0]);
		}
	}

	const handleSelectedSymbols = (countryCode: string) => {
		const list: string[] = Constant.SYMBOL_DEFAULT_LIST[countryCode];

		setSymbolList(list);
	}

	return (
		<>
			<div className='flex flex-col'>
				<div><SearchStock handleOnItemSelect={(stockData) => addItem(stockData)} handleOnClose={() => { }} /></div>

				<div className="mt-20 pl-4 mb-2"><CountryList selectedItem="US" onSelectedItem={(countryCode) => handleSelectedSymbols(countryCode) } /></div>
				{symbolList.length > 0 && <div><StockIndexList symbols={symbolList} handleOnItemClick={(item) => AppStore.setSelectedSymbolData(item)} /></div>}
			</div>
		</>
	);
};