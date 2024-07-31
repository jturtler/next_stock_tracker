import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import React, { useState, useEffect } from 'react';
import WatchList from './WatchList';
import AddWatchListForm from './AddWatchListForm';
import { fetchIndividualData } from '@/lib/utils/fetchStockIndexes';
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/AppStore";
import { useMainUi } from '@/contexts/MainUiContext';
import * as Constant from "@/lib/constant";
import WatchListDetails from './WatchListDetails';


const WatchListPage: React.FC = () => {
	
	const { user } = useAuth();
	const { setMainPage } = useMainUi();

	const [stocks, setStocks] = useState<JSONObject[] | null>(null);
	const [watchlist, setWatchlist] = useState<JSONObject[]>([]);
	const [availableStocks, setAvailableStocks] = useState<JSONObject[]>([]);
	const [selectedStock, setSelectedStock] = useState<string>('');
	const [showAddWatchListForm, setShowAddWatchListForm] = useState(false);


	const showWatchlistByGroup = async(groupItem: JSONObject) => {
		const symbols = groupItem.stocks.map((item: JSONObject) => item.symbol );
		const response = await fetchIndividualData( symbols.join(";") );

		if (response.status == "success") {
			setStocks( response.data );
			// AppStore.setSelectedSymbolData(response.data[0]);
			// setMainPage(Constant.UI_SYMBOL_DETAILS);
		}
	}

	const showStockDetails = (stock: JSONObject) => {
		AppStore.setSelectedSymbolData( stock );
		setMainPage(Constant.UI_SYMBOL_DETAILS);
	}

	// const removeStockFromWatchlist = (symbol: string) => {
	// 	const updatedWatchlist = watchlist.filter(s => s.symbol !== symbol);
	// 	setWatchlist(updatedWatchlist);
	// 	localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
	// };

	return (
		<div>
			<div className='flex flex-row w-full'>
				<WatchList handleItemClick={(groupItem: JSONObject) => showWatchlistByGroup(groupItem) }/>

				{stocks && <div className='flex-1'><WatchListDetails stocks={stocks} handleItemClick={(stock) => showStockDetails(stock) } /></div>}
			</div>
		
			<button className="bg-orange-400 p-3 rounded-lg m-3" onClick={() => setShowAddWatchListForm(true)}>Add Watchlist</button>
			{showAddWatchListForm && <AddWatchListForm />}
		</div>
	);
};

export default WatchListPage;
