'use client';

import MainNavigation from './layout/MainNavigation';
import * as Constant from "@/lib/constant";
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndexDetails from './stock-index-data/StockIndexDetails';
import HomePage from './HomePage';
import * as AppStore from "@/lib/AppStore";
import CompareStocksPage from './compare-stock-indexes-chart/CompareStockPage';


export default function AppWrapper() {

	const {mainPage} = useMainUi();

	return (
		<>
			<MainNavigation />
			<div className="bg-[#ffffff] text-[#2d3748]">
				{ mainPage == Constant.UI_PAGE_HOME && <HomePage />}
				{ mainPage == Constant.UI_SYMBOL_DETAILS && <StockIndexDetails curPriceData={AppStore.getSelectedSymbolData()} />}
				{ mainPage == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS && <CompareStocksPage />}
			</div>
		</>
	);
};