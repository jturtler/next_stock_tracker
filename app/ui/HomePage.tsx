'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './stock-index-data/StockChart';
import CurrentStockIndexes from './StockIndexList';
import MainNavigation from './layout/MainNavigation';
import * as Constant from "@/lib/constant";
import CompareStocksChart from './compare-stock-indexes-chart/CompareStockIndexesChart';
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndexDetails from './stock-index-data/StockIndexDetails';
import { JSONObject } from '@/lib/definations';


export default function HomePage() {

	const {mainPage, setMainPage} = useMainUi();
	const [selectedSymbolData, setSelectedSymbolData] = useState<JSONObject | null >(null);

	return (
		<div>
			<MainNavigation  />

			{ mainPage == Constant.UI_PAGE_HOME && <CurrentStockIndexes handleOnItemClick={(item) => setSelectedSymbolData(item)} />}
			{ mainPage == Constant.UI_SYMBOL_DETAILS && <StockIndexDetails curPriceData={selectedSymbolData!} handleOnClose={()=> setMainPage(Constant.UI_PAGE_HOME)}/>}
			{ mainPage == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS && <CompareStocksChart />}
		</div>
	);
};