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
import CompareStockPage from './compare-stock-indexes-chart/CompareStockPage';
import fetchHistoricalData from '@/lib/utils/fetchStockHistoricalData';


export default function HomePage() {

	const { mainPage, setMainPage, setSubPage } = useMainUi();
	const [selectedStock, setSelectedStock] = useState<JSONObject | null>(null);
	const [symbolList, setSymbolList] = useState<string[]>(Constant.SYMBOL_DEFAULT_LIST["US"]);

	const [compareStocks, setCompareStocks] = useState<JSONObject[] | null>(null);

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

	const fetchDataForCompareStocks = async(countryCode: string) => {
		const symbols: string[] = Constant.SYMBOL_DEFAULT_LIST[countryCode];
		let list: JSONObject[] = [];
		for( var i=0; i<symbols.length; i++ ) {
			const searchSymbolData = await fetchIndividualData(symbols[i]);
			const data = await fetchHistoricalData(symbols[i], "7D");

			let chartData = searchSymbolData.data[0];
			
			const longName = searchSymbolData.longname !== undefined ? searchSymbolData.longname : searchSymbolData.longName;
			chartData.longname = longName;
			chartData.chartData = data.data;
			list.push( chartData );
		}

		setCompareStocks(list);
	}

	return (
		<>
			{compareStocks === null && 
				<div className='flex flex-col'>
					<div><SearchStock handleOnItemSelect={(stockData) => addItem(stockData)} handleOnClose={() => { }} /></div>

					<div className="mt-20 pl-4 mb-2"><CountryList 
						selectedItem="US" 
						onSelectedItem={(countryCode) => handleSelectedSymbols(countryCode) }
						onCompareMarkets={(countryCode) => fetchDataForCompareStocks(countryCode) }
					/></div>

				{symbolList.length > 0 && <div><StockIndexList symbols={symbolList} handleOnItemClick={(item) => AppStore.setSelectedSymbolData(item)} /></div>}
			</div>}

			{compareStocks !== null && <CompareStockPage stockList={compareStocks} />}
		</>
	);
};