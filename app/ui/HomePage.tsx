'use client';

import { useEffect, useState } from 'react';
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

	useEffect(() => {
		AppStore.setCompareSymbolList([]);
	},[])

	const addItem = async (data: JSONObject) => {
		const response = await fetchIndividualData(data.symbol);
		if (response.status == "success") {
			AppStore.setSelectedSymbolData(response.data[0]);
			setMainPage(Constant.UI_SYMBOL_DETAILS);
			setSubPage(Constant.UI_CHART);
			setSelectedStock(response.data[0]);
		}
	}

	const handleCountryChange = (countryCode: string) => {
		const list: string[] = Constant.SYMBOL_DEFAULT_LIST[countryCode];
		setSymbolList(list);
	}

	const handleShowCompareChart = (countryCode: string) => {
		const symbols: string[] = Constant.SYMBOL_DEFAULT_LIST[countryCode];
		AppStore.setCompareSymbolList(symbols);

		setMainPage(Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS);
		setSubPage(Constant.UI_CHART);
	};


	return (
		<>
			{/* {compareStocks === null &&  */}
				<div className='flex flex-col'>
					<div><SearchStock handleOnItemSelect={(stockData) => addItem(stockData)} handleOnClose={() => { }} /></div>

					<div className="mt-20 pl-4 mb-2"><CountryList 
						selectedItem="US" 
						onSelectedItem={(countryCode) => handleCountryChange(countryCode) }
						onCompareMarkets={(countryCode) => handleShowCompareChart(countryCode) }
					/></div>

				{symbolList.length > 0 && <div><StockIndexList symbols={symbolList} handleOnItemClick={(item) => AppStore.setSelectedSymbolData(item)} /></div>}
			</div>
			{/* } */}

			{/* {compareStocks !== null && <CompareStockPage stockList={compareStocks} />} */}
		</>
	);
};