'use client';

import { useState } from 'react';
import axios from 'axios';
import StockChart from './stock-index-data/StockChart';
import CurrentStockIndexes from './StockIndexList';
import MainNavigation from './layout/MainNavigation';
import * as Constant from "@/lib/constant";
import CompareStocksChart from './compare-stock-indexes-chart/CompareStockIndexesChart';


export default function HomePage() {

	const [page, setPage] = useState(Constant.UI_PAGE_HOME);

	return (
		<div>
			<MainNavigation handleOnItemClick={(name: string) => setPage(name)} />

			{ page == Constant.UI_PAGE_HOME && <CurrentStockIndexes />}
			{ page == Constant.UI_PAGE_COMPARE_STOCK_INDEXES_CHARTS && <CompareStocksChart />}
		</div>
	);
};