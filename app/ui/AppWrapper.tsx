'use client';

import MainNavigation from './layout/MainNavigation';
import * as Constant from "@/lib/constant";
import { useMainUi } from '@/contexts/MainUiContext';
import StockIndexDetails from './stock-index-data/StockIndexDetails';
import HomePage from './HomePage';
import * as AppStore from "@/lib/AppStore";
import CompareStocksPage from './compare-stock-indexes-chart/CompareStockPage';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import WatchListPage from './watch-list/WatchListPage';
import PortfolioList from './Portfolio/PortfolioList';


export default function AppWrapper() {

	const {mainPage} = useMainUi();

	return (
		<>
			{(mainPage !== Constant.UI_PAGE_LOGIN && mainPage !== Constant.UI_PAGE_AUTH_REGISTRATION ) && 
				<div className="md:hidden bg-[#edf2f7] text-[#2d3748] p-2"><MainNavigation /></div>}

			<div className="bg-[#ffffff] text-[#2d3748]">
				{ mainPage == Constant.UI_PAGE_HOME && <HomePage />}
				{ mainPage == Constant.UI_SYMBOL_DETAILS && <StockIndexDetails curPriceData={AppStore.getSelectedSymbolData()} />}
				{ mainPage == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS && <CompareStocksPage />}
				{ mainPage == Constant.UI_PAGE_WATCH_LIST && <WatchListPage />}
				{ mainPage == Constant.UI_PAGE_PORTFOLIO && <PortfolioList />}
				{ mainPage == Constant.UI_PAGE_LOGIN && <LoginForm />}
				{ mainPage == Constant.UI_PAGE_AUTH_REGISTRATION && <RegisterForm />}
			</div>
		</>
	);
};