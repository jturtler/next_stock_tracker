'use client';

import { useState } from 'react';
import MainNavigation from './layout/MainNavigation';
import * as Constant from "@/lib/constant";
import CompareStocksChart from './compare-stock-indexes-chart/CompareStockIndexesChart';
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndexDetails from './stock-index-data/StockIndexDetails';
import { JSONObject } from '@/lib/definations';
import HomePage from './HomePage';
import * as AppStore from "@/lib/AppStore";


export default function AppWrapper() {

	const {mainPage, setMainPage} = useMainUi();

	return (
		<div>
			<MainNavigation  />

			{ mainPage == Constant.UI_PAGE_HOME && <HomePage />}
			{ mainPage == Constant.UI_SYMBOL_DETAILS && <StockIndexDetails curPriceData={AppStore.getSelectedSymbolData()} handleOnClose={()=> setMainPage(Constant.UI_PAGE_HOME)}/>}
			{ mainPage == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS && <CompareStocksChart />}
		</div>
	);
};